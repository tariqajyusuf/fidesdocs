# Fides Release Notes 

## Fides 2.14.0 ##
May 30, 2023

**Enhancements**
  - **Support for data categories on manual processes**: The manual process definition for access requests now supports data categories which will enable categorization in access request files in future releases. 
  - **Snowflake dataset generation**: Improved handling of Snowflake object casing and quoting in dataset generation. [#3245](https://github.com/ethyca/fides/pull/3245)
  - **Audit Logs**: Added optional, basic audit logs for POST and PUT requests
 [#3331](https://github.com/ethyca/fides/pull/3331)

**Connector updates**
- [Delighted](https://delighted.com/): Updated the  connector so the `survey_response` endpoint depends on the `person` endpoint. [#3385](https://github.com/ethyca/fides/pull/3385)
- Email: Email based connectors now respect the `notifications.notification_service_type` configuration variable [#3355](https://github.com/ethyca/fides/pull/3355)


**Removed**
* The `export` CLI command was removed.

## Fides 2.13.0 ##
May 15, 2023

**Enhancements**
- **Fixed broken links** to docs site pages in Admin UI [#3232](https://github.com/ethyca/fides/pull/3232)
- **Deprecated fides export CLI command** as it is moving to fidesplus [#3264](https://github.com/ethyca/fides/pull/3264)


**Connector updates**
- [Amplitude](https://amplitude.com/): Access & erasure support
- [Gorgias](https://www.gorgias.com/): Access & erasure support
- [OneSignal](https://onesignal.com/): Access & erasure support
- [DynamoDB](https://www.amazonaws.cn/en/dynamodb/): Access & erasure support

## Fides 2.12 ##
May 2, 2023

**Enhancements**
- **Pseudonymous consent preferences**: Identity verification for saving consent preferences is now optional. Previously, all consent requests required either email or phone validation. This change adds the "Fides User Device ID" field to the Fides user preferences cookie which will contain a randomly generated unique ID to represent the user's browser and store preferences on the Fides server. 
    - Note: Most 3rd party APIs or databases require primary identifiers to function, so functionality will be limited if identity verification is disabled.


**Connector updates**
- [Aircall](https://aircall.io/): Access & erasure support
- [Klaviyo](https://www.klaviyo.com/): Access & erasure support
- [Unbounce](https://unbounce.com/): Access & erasure support

## Fides 2.11 ##
April 17, 2023

**Enhancements**
- **Connector template uploads**: Connector templates can now be uploaded in the Connectors UI to create new connectors or update existing connectors.  
- **Connector updates**
    - **Shippo**: Added a privacy request access connector Shippo



## Fides 2.10 ##
April 3, 2023

**Enhancements**
- **Dedicated links for systems**: Systems now have dedicated URLs to make it easy to find or share a system.
- **Credentials via config file**: Allows users to configure their username and password via the config file.
- **Self-service passwords** - Viewers and Approvers can reset their own passwords from the User Management UI
- **Secure Masking API**: Added [optional] authentication to the masking endpoints. 
- **Organization Management page**: Added a page for managing organization information to the UI. 
- **Connector updates**
    - **Attentive Connector**: Added a privacy request connector for Attentive

**Known Issues**
- Creating a duplicate user does not work and does not show error.


## Fides 2.9.0-2.9.2
March 24, 2023

**What's New**
- **Role Based Access Controls (RBAC)**: we've updated the permission scheme from an individual scope based approach to a role based approach.
    - **Owners**: Owners have view and edit access to the whole organization and can create new users.
    - **Contributors**: Contributors can create new users and have view and edit access to the whole organization apart from configuring storage and messaging.
    - **Viewers**: Viewers have view access to the Data Map and all systems.

**Enhancements**
- **Consistent navigation**: we've removed progressive navigation logic that would hide Admin UI tabs until Systems / Connections were configured (#2762) and retired the `legacy navV2 feature flag` (#2762)
- **Connector updates**
    - **Auth0**: Added OAuth2 credential inputs (#2820)
    - Refactor to more easily support email for erasure connections #2782
- **Other Fixes**: 
    - Fixed issue where unsaved changes warning would always show up when running fidesplus (#2788)
    - Fixed problem in datamap export with datasets that had been updated via SaaS instantiation (#2841)
    - Fixed problem in datamap export with inconsistent custom field ordering (#2859)

*Note:* For the new RBAC roles to take effect, you **must** set the environment variable `FIDES__SECURITY__ENV` to prod.
