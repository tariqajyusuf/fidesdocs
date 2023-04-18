import Callout from 'nextra-theme-docs/callout'


# Global Privacy Control Support in Fides

Fides is capable of respecting consent preferences that are communicated using a Global Privacy Control (GPC) signal.

## What is Global Privacy Control?

From the website [Global Privacy Control](https://globalprivacycontrol.org/): 

> Global Privacy Control (GPC) is a proposed specification designed to allow Internet users to automatically notify businesses of their privacy preferences and is confgured using a setting or extension in the user’s browser or device.

The [GPC specification](https://globalprivacycontrol.org/#gpc-spec) defines the format of the signal which can be interpreted by consent platforms and websites to automatically set a user's consent preferences and opt them out of data sales and sharing.

## Configuring GPC support

Global Privacy Control can be enabled in Fides within the privacy center's `config.json` file as shown in the following example:

```json filename="config.json"
"consentOptions": [
      {
        "fidesDataUseKey": "advertising",
        "name": "Data Sales or Sharing",
        "description": "We may use some of your personal information for behavioral advertising purposes, which may be interpreted as 'Data Sales' or 'Data Sharing' under regulations such as CCPA, CPRA, VCDPA, etc.",
        "url": "https://example.com/privacy#data-sales",
        "default": {
          "value": true,
          "globalPrivacyControl": false
        },
        "highlight": false,
        "cookieKeys": ["data_sales"],
        "executable": false
      }
      ...
]
```

In this example, there exists a line (or flag) for `globalPrivacyControl`,  which means that this sytem has been configured for GPC, and the value of the flag is set to "false". For guidance on how to determine which data uses should respect GPC, see: [Define which geography to apply GPC](https://docs.ethyca.com/regulations/gpc/geo_gpc). 

<Callout emoji="ⓘ">
Since Fides does not currently detect the location of website visitors, we recommend that you use California regulations as a template for which data uses to configure for GPC so that you have the broadest possible coverage for US regulations.
</Callout>

If you update the privacy center's `config.json` file, you will need to rebuild and redeploy your privacy center for the changes to take effect. You will need to include the updated `fides-consent.js` file in your website by adding this script tag as close to the top of `<head>` as possible on all pages.

```html
<script src="https://<route-to-privacy-center.com>/fides-consent.js></script>
```

When this update is complete, the first time a user visits your site with a GPC-enabled browser their consent preferences will be automatically set. All web-based services which have been integrated with Fides consent, including third party tag managers like Google Tag Manager, will honor this preference. 

```json filename="Fides object"
{
  "consent": {
    "data_sales":false,
    "first_party_marketing":false,
    "analytics":true
    }
}
```

When a user visits your privacy center with a GPC-enabled browser their consent options will be updated accordingly and the privacy center will inform them that the GPC signal was honored.
![Privacy Center with GPC Enabled](../../../public/assets/img/consent/gpc-privacy-center-info.png)


Additionally, when a user visits your privacy center with a GPC-enabled browser but has a previous, conflicting preference, they will be informed that it overrides the GPC signal.

![Conflicting Consent Preference](../../../public/assets/img/consent/gpc-privacy-center-conflict.png)

### Consent Records with GPC

For each consent present set by a user, Fides stores the following configurations related to GPC:

1. `has_gpc_flag` which indicates whether or not the particular data use is configured for GPC.
2. `conflicts_with_gpc` which indicates how to handle the case where a consent preference is overridden by the GPC signal.

To programmatically retrieve the consent preferences of a user, make a request to the endpoint:

```
POST: /api/v1/consent-request/preferences
```

The request body must contain the identity of the user. For example:
```json
{
    "email": "user@example.com"
}
```

The response body will return the current consent preferences for that user:

```json
{
    "consent": [
        {
            "data_use": "advertising",
            "data_use_description": "We may use some of your personal information for behavioral advertising purposes, which may be interpreted as 'Data Sales' or 'Data Sharing' under regulations such as CCPA, CPRA, VCDPA, etc.",
            "opt_in": true,
            "has_gpc_flag": true,
            "conflicts_with_gpc": true
        },
        {
            "data_use": "advertising.first_party",
            "data_use_description": "We may use some of your personal information to contact you about our products & services.",
            "opt_in": false,
            "has_gpc_flag": true,
            "conflicts_with_gpc": false
        },
        {
            "data_use": "improve",
            "data_use_description": "We may use some of your personal information to collect analytics about how you use our products & services.",
            "opt_in": true,
            "has_gpc_flag": false,
            "conflicts_with_gpc": false
        }
    ]
}
```

### Signal Your Compliance with GPC
To indicate that your site is compatible with GPC, you can set the `gpc.json` objects as [recommended by the GPC specification](https://privacycg.github.io/gpc-spec/#gpc-support-resource) by placing the following script at  
 `<http://<yourdomain>/.well-known/gpc.json`:

```json
{
  "gpc": true,
  "lastUpdate": "[date placed in the following format: 2023-01-14]"
}
```

The content-type must be `application/json`.
