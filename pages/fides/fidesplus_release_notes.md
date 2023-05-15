# Fides For Business Release Notes 

## Fides For Business 2.12.1 ##
May 5, 2023

**Fixed**
- **Updates to custom fields no longer require hard refresh**: this issue is now fixed and custom field updates are reflected automatically. 


## Fides For Business 2.12 ##
May 2, 2023

**What's New** 
- **Custom fields**: create custom reports by adding custom fields to your systems, data uses, and taxonomy elements! Supported field types are open text, single-select, and multi-select.

**Enhancements**
- **Pseudonymous consent preferences**: Identity verification for saving consent preferences is now optional. Previously, all consent requests required either email or phone validation. This change adds the "Fides User Device ID" field to the Fides user preferences cookie which will contain a randomly generated unique ID to represent the user's browser and store preferences on the Fides server. 
    - Note: Most 3rd party APIs or databases require primary identifiers to function, so functionality will be limited if identity verification is disabled.

**Connector updates**
- [Aircall](https://aircall.io/): Access & erasure support
- [Klaviyo](https://www.klaviyo.com/): Access & erasure support
- [Unbounce](https://unbounce.com/): Access & erasure support

**Known Issues**
- **Custom field ordering***: Currently, custom fields are not rendered in any particular order where they are placed or in the table of custom fields. 
- **Updates to custom fields require hard refresh**: When creating a new custom field or updating the name of an existing custom field, a hard refresh must be performed to view these columns in the Data Map table view. This will be resolved in a subsequent release. 

## Fides For Business 2.11 ##
April 17, 2023

**Enhancements**
- **Data Flow**: Source and Destination systems can now be configured directly in the Data Map to create graphs of data flow.
- **Filtered Data Map export**: Exporting reports from the Data Map now respects filters and column views to allow for custom reports.
- **Data Steward as reportable field**: When users are assigned systems, they will appear in the Data Map and reports as the Data Steward for this system. This is a searchable field.
- **Connector template uploads**: Connector templates can now be uploaded in the Connectors UI to create new connectors or update existing connectors. 
- **Connector updates**
    - **Shippo Access Connector**: Added a privacy request connector for Shippo

**Known Issues**
- **Data Flow**: when configuring data flow, the source and destination fields are not reciprocal meaning that this value is only set on the system where it has been configured. To make this reportable or searchable, you must set the reciprocal field on the related system. Will be solved in a future release.

## Fides For Business 2.10
April 3, 2023

**Enhancements**
- **Filters & search for graph**: Added filters & search to the graph view of the Data Map and added an indicator for when filters are applied.
- **System info panel**: System info panel is now accessible from the table view of the Data Map.
- **Grouping by System Name in table**: The Data Map table now groups by System Name & Data Use to make it easier to explore. 
- **Dedicated links for systems**: Systems now have dedicated URLs to make it easy to find or share a system.
- **Credentials via config file**: Allows users to configure their username and password via the config file.
- **Self-service passwords** - Viewers and Approvers can reset their own passwords from the User Management UI
- **Secure Masking API**: Added [optional] authentication to the masking endpoints. 
- **Organization Management page**: Added a page for managing organization information to the UI. 
- **Connector updates**
    - **Attentive connector**: Added a privacy request connector for Attentive.

**Known Issues**
- Searching for a system in the table view only returns the fields searched for and not the whole record.
- Creating a duplicate user does not work and does not show an error.


## Fides For Business 2.9.0-2.9.3
March 24, 2023

**What's New**
- **Role-Based Access Controls (RBAC)**: we've updated the permission scheme from an individual scope-based approach to a role based approach.
    - **Owners**: Owners have `view` and `edit` access to the whole organization and can create new users.
    - **Contributors**: Contributors can create new users and have `view` and edit access to the whole organization apart from configuring storage and messaging.
    - **Viewers**: Viewers have view access to the Data Map and all systems.
    - **Approvers**: Privacy Request Approvers only have access to the Privacy Request Manager to review/approve/reject privacy requests.
    - **Data Stewards**: Systems can be assigned to users for management which grants elevated access to particular systems without changing overall data map permissions.

**Enhancements**
- **Search & Filtering Data Map Table**: search and filtering have been added to the Data Map table supporting filters for `Data Uses`, `Data Categories`, and `Data Subjects` in addition to open text search.
- **Data Map table improvements**: including a default set of columns, renamed columns, performance enhancements, and `System Name` is now pinned to the left of the table.
- **Processing Activity field**: we've added an open text field called `Processing Activity` to the `Data Use` declaration. 
- **Consistent navigation**: we've removed progressive navigation logic that would hide Admin UI tabs until Systems / Connections were configured (#2762) and retired the `legacy navV2 feature flag` (#2762)
- **Connector updates**
    - **Auth0**: Added OAuth2 credential inputs (#2820)
    - Refactor to more easily support email for erasure connections #2782
- **Other Fixes**: 
    - Fixed issue where unsaved changes warning would always show up when running fidesplus (#2788)
    - Fixed problem in data map export with datasets that had been updated via SaaS instantiation (#2841)
    - Fixed problem in data map export with inconsistent custom field ordering (#2859)

**Known Issues**
* The Data Map column `Joint Controller` does not get populated even when joint controller information is added to a system.


*Note:* For the new RBAC roles to take effect, you **must** set the environment variable `FIDES__SECURITY__ENV` to prod.