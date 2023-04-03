# Fides For Business Release Notes 

## Fides For Business 2.10
April 3, 2023

**Enhancements**
- **Filters & search for graph**: Added filters & search to the graph view of the Data Map and added an indicator for when filters are applied.
- **System info panel**: System info panel is now accessible from the table view of the Data Map.
- **Grouping by System Name in table**: The Data Map table now groups by System Name & Data Use to make it easier to explore. 
- **Dedicated links for systems**: Systems now have dedicated URLs to make it easy to find or share a system.
- **Credentials via config file**: Allow users to configure their username and password via the config file.
- **Self-service passwords** - Viewers and Approvers can reset their own passwords from the User Management UI
- **Secure Masking API**: Added [optional] authentication to the masking endpoints. 
- **Organization Management page**: Added a page for managing organization information to the UI. 
- **Connector updates**
    - **Attentive connector**: Added a privacy request connector for Attentive.

**Known Issues**
- Searching for a system in the table view only returns the fields searched for and not the whole record.
- Creating a duplicate user does not work and does not show error.


## Fides For Business 2.9.0-2.9.3
March 24, 2023

**What's New**

- **Role Based Access Controls (RBAC)**: we've updated the permission scheme from an individual scope based approach to a role based approach.
    - **Owners**: Owners have view and edit access to the whole organization and can create new users.
    - **Contributors**: Contributors can create new users and have view and edit access to the whole organization apart from configuring storage and messaging.
    - **Viewers**: Viewers have view access to the Data Map and all systems.
    - **Approvers**: Privacy Request Approvers only have access to the Privacy Request Manager to review/approve/reject privacy requests.
    - **Data Stewards**: Systems can be assigned to users for management which grants elevated access to particular systems without changing overall data map permissions.

**Enhancements**
- **Search & filtering Data Map table**: we've added search and filtering to the Data Map table supporting filters for `Data Uses`, `Data Categories`, and `Data Subjects` in addition to open text search.
- **Data Map table improvements**: including a default set of columns, renamed columns, performance enhancements, and `System Name` is now pinned to the left of the table.
- **Processing Activity field**: we've added an open text field called `Processing Activity` to the `Data Use` declaration. 
- **Consistent navigation**: we've removed progressive navigation logic that would hide Admin UI tabs until Systems / Connections were configured (#2762) and retired the `legacy navV2 feature flag` (#2762)
- **Connector updates**
    - **Auth0**: Added OAuth2 credential inputs (#2820)
    - Refactor to more easily support email for erasure connections #2782
- **Other Fixes**: 
    - Fixed issue where unsaved changes warning would always show up when running fidesplus (#2788)
    - Fixed problem in datamap export with datasets that had been updated via SaaS instantiation (#2841)
    - Fixed problem in datamap export with inconsistent custom field ordering (#2859)

**Known Issues**
* The Data Map column `Joint Controller` does not get populated even when joint controller information is added to a system.


*Note:* For the new RBAC roles to take effect, you **must** set the environment variable `FIDES__SECURITY__ENV` to prod.
