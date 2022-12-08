# Enhanced Data Masking

Along with the default masking engine provided by the [open source edition](../fides/dsr_support/masking_strategies.md), Fides for Enterprise customers enables NLP and regex-powered masking strategies to safeguard data at scale. These masking strategy can be used on their own or combined to identify and replace personal information in free-text fields. 

The available Enterprise masking strategies are an extension of the open source masking engine. To review standard implementation options, see the [open source documentation](../fides/dsr_support/masking_strategies.md).

## NLP data masking

Natural language processing, or NLP, allows Fides to perform sophisticated de-identification of personally identifiable information embedded in free-text. This strategy uses a machine learning model trained specifically to recognize and redact personal information that is included as part of free-text. The redacted text areas will be replaced with generic text (e.g. `[NAME_1]`).

As with the open source masking strategy, NLP data masking can be invoked by calling the `/mask` endpoint.

```PUT /api/v1/masking/mask```:
```json
{
    "values": ["test@example.com", "my name is john"],
    "masking_strategy": {
        "strategy": "nlp",
        "configuration": {
            "multilingual" : false
        }
    }
}
```

Successful calls to `/mask` will return a version of the input with the masked values:
```json
{
    "plain": [
        "test@example.com",
        "my name is john"
    ],
    "masked_values": [
        "[EMAIL_ADDRESS_1]",
        "my name is [NAME_1]"
    ]
}
```

### Configuration

| Attribute | Description |
| --- | -------- |
| `strategy` | Set to `nlp` to use the natural language processing engine. For more information on masking strategies, see the [open source documentation](../fides/dsr_support/masking_strategies.md).|
| `configuration` |
|  `multilingual` | _(Optional.)_ `bool` that specifies whether the input text is English-only (`false`), or contains other languages (`true`). Default is `false`, or English-only. _Note: If the input text is known to be English, this flag should be set to false for optimal performance._ Supported languages are listed in the [supported languages](#supported-languages) section below. |
| `accuracy_mode` | _(Optional.)_ `str` that specifies which of the NLP service's accuracy modes to use when processing the input text. Supported modes are `fast`, `standard`, `standard_high` and `high`. See [accuracy modes](#accuracy-modes) below. |
| `batch_size` | _(Optional.)_ `int` that specifies the size of batches (number of text fields) to send per call to the NLP service. This is meant to be used for performance tuning in high-throughput scenarios. Default is `16`. |
| `log_results` | _(Optional.)_ `bool` that specifies whether the masking agent should log the de-identification results that are obtained from the NLP service. Default is `true`. |

### Accuracy modes 
The NLP service provides four accuracy modes to use when processing input text. The supported modes are `fast`, `standard`, `standard_high` and `high`. 

These modes allow for tradeoffs between throughput (speed) and model accuracy, with `fast` being the fastest mode and `high` being the most accurate mode.

If no accuracy mode is specified, the accuracy mode will default to `fast` when `multilingual` is set to `true`. Otherwise, the default accuracy mode is `standard`. 

The mode `fast` is only available when `multilingual` is set to `true`. 

## Regex data masking
The `regex_replace` strategy masks personal information in a given text field by first identifying the text’s language, then evaluating the text against customer-supplied, language-specific regular expressions. Any matching results will be replaced with the customer-specified replacement text (e.g. `[NAME_1]`).

If there are no regular expressions defined for the identified language, or the language is identified with low confidence, the entire text field will be replaced by a default.

As with the open source masking strategy, NLP data masking can be invoked by calling the `/mask` endpoint.

```PUT /api/v1/masking/mask```:
```json
{
   "values":[
      "tall male suspect",
      "1 N Albany Cir",
      "patient blood type is AB positive",
      "VA, 20402",
      "asdf",
      "berros"
   ],
   "masking_strategy":{
      "strategy":"regex_replace",
      "configuration":{
      }
   }
}
```

Successful calls to `/mask` will return a version of the input with the masked values:

```json
{
    "plain": [
        "tall male suspect",
        "1 N Alabany Cir",
        "patient blood type is AB positive",
        "VA, 20402",
        "asdf",
        "berros"
    ],
    "masked_values": [
        "tall gender suspect",
        "street",
        "patient blood type is AB positive",
        "MASKED",
        "MASKED",
        "MASKED"
    ]
}
```

### Configuration
Fides supports defining your regex_replace configuration as YAML. For more information, see [how to supply a configuration file](#supply-a-configuration-file) below.

| Attribute | Description |
| --- | -------- |
| `strategy` | Set to `regex_replace` to use the regular expression masking strategy. For more information on masking strategies, see the [open source documentation](../fides/dsr_support/masking_strategies.md).|
| `configuration` | 
| `log_results` | _(Optional.)_ `bool` that specifies whether the masking agent should log the de-identification results that are obtained from the regex service. Fides will log regular expression replacement text when patterns are matched, when the entire value is replaced due to low language confidence, and when the entire is replaced because regular expressions are not defined for the identified language. Default is `true`. |
| `default_mask` | _(Optional.)_ The string that will automatically replace the entire value when the language is identified with low confidence, and when regular expressions are not configured for that language. Default is `MASKED`. |
| `required_confidence` | _(Optional.)_ The minimum confidence that the language identified is correct. If the confidence is below this threshold, the entire value will be replaced and regular expressions bypassed. Default is `0.25`. To force an entire list of regular expressions to be run for the given language, set required_confidence to `0.0`. To skip every regular expression and mask every value by default, set the required_confidence to `1.0`. |
| `multiprocessing` | _(Optional.)_  Allow regular expression masking to utilize multiple processes on the host machine. Default is `false`. |
| `cpu_cores` | _(Optional.)_  The number of cpu cores Fides will use for regex processing, supplied as an integer. Set to a lower number than your max to keep some processes free. Only applicable when `multiprocessing` is `true`. Default is `all`.
| `universal_regex` | _(Optional.)_  Any universal regular expressions that will be run against the input by default, in addition to the regular expressions identified for that language. See [universal regular expressions](#universal-regular-expressions) below.
| Other regular expressions | _(Optional.)_ Regular expressions  that will be run against the input based on language code. Regular expression search is case-insensitive. See [other regular expressions](#other-regular-expressions) below.
| `identified_language` | _(Optional.)_  If you are certain of the language of every supplied value, you can provide a language code with your request. This will evaluate every value against the defined regular expressions for that language. For example, if all values are in English, you can supply the English code `EN`. Default is `""`.

### Using a configuration file
Due to the potential length of the regular expression lists, `universal_regex` and language-based regular expressions should be specified in a `fides.toml` file under the `regex_replace. This file may be supplied at container runtime via volume mount.

#### Universal regular expressions 
Universal regular expressions should be defined under a `universal_regex` key as a list of lists, containing pairs of regular expression patterns followed by the replacement text:

```yaml
[regex_replace]
universal_regex = [
    ["<regular expression pattern>", "replacement text"],
    ["<regular expression pattern>", "replacement text"]
]
```

#### Other regular expressions 
Regular expressions should be defined by language code, as a list of lists, and contain pairs of regular expressions followed by replacement text. Regular expression search is case-insensitive. 

```yaml
[regex_replace]
EN = [
      ["concert|movie|snorkeling class|art exhibit", "[EVENT]"],
]
```

In this example, if the language of your value was identified as EN, the words `concert`, `movie`, `snorkeling class`, or `art exhibit` would be replaced with the text `[EVENT]`.

## Combined masking strategies
To maximize accuracy in identifying personal information among free-text, you may optionally specify both the `nlp` strategy and the `regex_replace` strategy in a single request. The strategies will be executed in the order specified.

In the below example, the values are run against the NLP engine before being run against the regular expression strategy. This example also adds the `required_confidence` and `default_mask` parameters to the `nlp` strategy.
```json
{
   "values":[
      "tall male suspect",
      "1 N Alabany Cir",
      "patient blood type is AB positive",
      "VA, 20402",
      "asdf",
      "berros"
   ],
   "masking_strategy":[
          {
         "strategy":"nlp",
         "configuration":{
            "multilingual": true,
            "required_confidence": 0.25
         }
      },
   
      {
         "strategy":"regex_replace",
         "configuration": {
            "required_confidence": 0.25,
            "default_mask": "MASKED"
         }
      }
   ]
}
```

Response:
```json
{
    "plain": [
        "tall male suspect",
        "1 N Albany Cir",
        "patient blood type is AB positive",
        "VA, 20402",
        "asdf",
        "berros"
    ],
    "masked_values": [
        "tall gender suspect",
        "addr:street_num",
        "patient blood type is [BLOOD_TYPE_1]",
        "MASKED",
        "MASKED",
        "MASKED"
    ]
}
```

## Supported languages 
The following languages are supported by the NLP masking engine when `multilingual` is set to `true`. Only English is supported when `multilingual` is set to `false`.

**Core** support indicates the language is fully supported. **Extended** support indicates a “beta” level support that may require further optimizations.


| Language | Support Level |
| ---- | ---- |
| English | Core |
| French | Core |
| German | Core |
| Italian | Core |
| Korean | Core |
| Portuguese | Core |
| Russian | Core
| Spanish | Core
| Tagalog | Core
| Arabic | Extended
| Bulgarian | Extended
| Burmese | Extended
| Bengali | Extended
| Catalan | Extended
| Croatian | Extended
| Czech | Extended
| Danish | Extended
| Dutch | Extended
| Estonian |Extended
| Finnish | Extended
| Greek | Extended
| Hebrew | Extended
| Hindi | Extended
| Hungarian | Extended
| Latvian |Extended
| Lithuanian | Extended
| Malay | Extended
| Norwegian (Bokmål) | Extended
| Persian (Farsi) | Extended
| Polish | Extended
| Punjabi | Extended
| Romanian | Extended
| Slovak | Extended
| Slovenian | Extended
| Swedish |Extended
| Tamil | Extended
| Turkish | Extended
| Ukrainian | Extended
| Vietnamese | Extended
