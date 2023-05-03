# Fides Release Notes 

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
