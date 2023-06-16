import Callout from 'nextra-theme-docs/callout'

# Configuring Consent in Google Tag Manager 

Current and upcoming state privacy regulations (e.g. CPRA, VCDPA, CPA) require organizations to offer consumers the right to opt in or out of a variety of data uses, such as data processing for sales, data sharing, and sensitive information processing.

Once you have configured and deployed your [Privacy Center Consent Management](./consent_management), Fides allows your users to save their privacy settings according to your customized consent configuration, and uses these stored consent choices to enable or disable corresponding data uses. 

### Install the Fides.js script on your website

The Privacy Center hosts a customized script called `fides.js` that can be used in a given web page to access the consent choices a user has made.

To install this script on your site, the following should be included within the `<head>` tag of your page:

```html
<head>
  <!-- Include before any scripts which need consent. -->
  <script src="privacy.example.com/fides.js"></script>
</head>
```

| Attribute | Description |
| --- | --- |
| `privacy.example.com` | Replace this with the URL to your deployed Privacy Center.


### Integrate Fides.js with Google Tag Manager
When using Google Tag Manager, calling `Fides.gtm()` will push the user's consent choices into GTM's Data Layer under a variable named `Fides.consent`.

To enable the Google Tag Manager integration, call `Fides.gtm()` in your website code:

```html
<head>
  <script src="https://privacy.example.com/fides.js"></script>
  <script>Fides.gtm()</script>

  <!-- Include Google Tag Manager's script below. -->
<head>
```

### Integrate Fides.js with Custom Javascript
For tags that are managed _outside_ of Google Tag Manager, or any other custom code which requires user consent, you can now check a user’s consent map under the `Fides.consent` global variable.

For example, to check for an explicit opt-out from a user:
```js
if (Fides && !Fides.consent.data_sales_and_sharing) {
  // User has opted out
} else {
  // User has not opted out
}
```

Note that, in the above example, `data_sales_and_sharing` matches a key set for one of the consent options during your Privacy Center configuration. See the [Privacy Center Consent Management](./consent_management) documentation for more details on how to customize these options and configure other keys, etc.

## Configure consent in Google Tag Manager (GTM)
The following step-by-step implementation will use the consent options created during your Privacy Center configuration. To begin, open your GTM console and select **Variables** from the navigation menu. 

### Set up a GTM variable
1. From the Variables menu, click **New** within the **User-Defined Variables** section.

2. Select **Data Layer Variable** (beneath Page Variables) as the type:

![Page Variables](../../../public/assets/img/google_tag_manager/image6.png)

3. Set the **Data Layer Variable Name** to the corresponding `cookieKey` configured in your Privacy Center (`Fides.consent.data_sales_and_sharing` in this guide’s examples).

4. Give the variable a suitable, identifiable name, such as `Fides.DataSalesAndSharing`, as in the example below:

![Data Layer](../../../public/assets/img/google_tag_manager/image4.png)

### Configure a Trigger Tag for consent
Many third-party tools rely on you to correctly configure their tags to fire depending on user consent. A single consent trigger tag ensures that a third-party tag only fires when a user’s consent is appropriately set.

1. Create a new Trigger by selecting **New** from the Tags menu.

2. Select the appropriate tag type (e.g. Page View):

![Trigger Type](../../../public/assets/img/google_tag_manager/image8.png)


<Callout> Ensure you use the appropriate trigger type for your tag. If your primary firing trigger is Page View based, use the **Page View** exception trigger. If your primary firing trigger is Custom Event based, use the **Custom Event** exception trigger.</Callout>

3. Give the trigger a suitable, identifiable name, such as Fides.DataSalesAndSharing.OptOut

4. Set “This trigger fires on” to Some Page Views.

5. In the “Fire this trigger when…” option, set the following:
    * The **event field** to match your user-defined variable earlier (e.g. `Fides.DataSalesAndSharing`)
    * The **evaluation** to `equals`
    * The **value** to `false`

![Trigger Settings](../../../public/assets/img/google_tag_manager/image9.png)

This new trigger event can now be added to your tags, and will ensure the tag is suppressed where the user has opted out (e.g. when a user’s consent preference has set **Fides.DataSalesAndSharing** to false.)

<Callout>You can repeat this step to include the condition on other types of triggers as you require them.  For example, this condition could be on Custom Events, Page Views, Window Loads or Initialization.</Callout>

### Use a custom consent trigger on a tag
To suppress tags from firing where user consent has not been given, you can add your new trigger using the following steps:

1. From the Tags menu, select the tag you would like to apply consent checks to.

2. Under **Triggering** you can add, remove or combine triggers. In this case, you are adding an _exception_ that will suppress firing where you do not have consent. Select **Add Exception** to add your newly created trigger.

![Add Exception](../../../public/assets/img/google_tag_manager/image7.png)

3. Select the consent trigger created earlier (e.g. Fides.DataSales.Consent), which will add it as an exception to your tag:

![Choose a Trigger](../../../public/assets/img/google_tag_manager/image1.png)

You should now see your trigger listed in your tag as an Exception. If configured according to this guide, this tag will no longer fire if a user has opted out of Data Sales. 

![Choose a Trigger](../../../public/assets/img/google_tag_manager/image5.png)

You can now repeat this on any tag in your GTM container.

### Configure Limited Data Use for Meta (Facebook)

Meta's implementation of data sales is unique to their platform, and requires specific configuration in Google Tag Manager.

To implement the Limited Data Use flag, the following modifications to your pixel are required:

![Pixel Edits](../../../public/assets/img/google_tag_manager/image10.png)

1. Add the line below _before_ `fbq('init', '00000000000');`

```
{{Fides.DataSalesAndSharing}} ? fbq('dataProcessingOptions', []) : fbq('dataProcessingOptions', ['LDU'], 1, 1000);
```

This line checks the value of `Fides.DataSalesAndSharing`, and will opt a user out of or into data processing based on its value (`true` or `false`).

<Callout> If your Meta pixel is using the `<noscript></noscript>` for non-javascript browsers, _remove this_ from your pixel. Consent management solutions, like Fides, rely on javascript; this pixel would risk firing, causing non-compliance.</Callout>

3. Save your changes. Your Limited Data Use is now configured!

### Configuring Restricted Data Processing for Google Ads

In order to configure Google's Restricted Data Processing flag, minor updates are required for the Google Ads pixel. _Make sure you have completed your [custom consent triggers](#use-a-custom-consent-trigger-on-a-tag) before proceeding._

1. Edit your Google Ads Pixel:

2. In the dropdown list labeled "Enable Restricted Data Processing", select the appropriate variable that you created [at the start](#set-up-a-gtm-variable) (e.g. `Fides.DataSalesAndSharing`).

![Restricted Data Processing](../../../public/assets/img/google_tag_manager/image11.png)


3. Save your changes, and repeat for any other Google Adsense (or similar Google integrations) that allow for restricted data processing options.
