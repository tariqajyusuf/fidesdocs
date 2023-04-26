import Callout from 'nextra-theme-docs/callout'

<Callout emoji="ⓘ">
Beta Feature. Custom fields are a beta feature in Fides. The feature is subject to change prior to general release.
</Callout>

<Callout emoji="ⓘ">
Fides Business feature. This feature is only available for Fides business customers. If you are intereted in using custom fields in your Fides deployment, reach out the Ethyca team.
</Callout>

{/* This could also be broken up into really small sub pages for a whole custom field section. I think I like that better  */}


# Custom Fields

You can use custom fields to add additional properties to your systems when there is not a default property that adequately describes the information you would like to include. 

Fides includes all the privacy related fields needed to create and manage a compliant RoPA, but dependening on your circumstances, you may want to add additional information to systems for reporting purposes or to communicate business specific information. Custom fields allow you to do this. 

## Enable Custom Fields
To enable custom fields, navigate to Management > About Fides. Under the "Beta Features" section, enable "Custom Fields".

TODO: Screenshot

## Adding custom fields to systems
The primary use for custom fields is to add additional properties to your systems so that you can include this information in your data map reports. 

Navigate to the systems page and edit a system. At the bottom of the page will be an option to "Add custom fields"

Click this to start adding your first custom fields.

## Create a custom list
Custom fields in Fides currently only support lists for values. Before saving a custom field you must create a list from which your users will select one or more values for the field.

On the custom field modal, click on the "Create custom list" tab. On this tab you can provide a list name and description, along with as many list items as you'd like. 

Once you've added all the list items needed, click "Add to Library" to save your list. The form will reset and you'll be able to create more lists if you need. 

TODO: Screenshot

## Create a custom field 
Create a custom field definition by providing: 
- Name 
- optional description
- List 
- Type (single select or multi-select)

Then choose whether you want the list to be visible in forms and reports or hidden.

You cannot currently select a resource type. This input is hardcoded to the form you are creating the custom field on. Currently you can create custom fields for system, data category, data subject, and data use forms.

Once you're ready, save the field. This 