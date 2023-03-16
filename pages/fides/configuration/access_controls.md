# Role-Based Access Controls

Fides uses Role-Based Access Controls which means that users can be assigned various roles within the organization that grant them a specific set of scopes (permissions). 

To get started, login as the `root user` to create an initial user with sufficient admin permissions (`owner` or `contributor`). We recommend logging in as one of those users to create other users in your organization with various levels of responsibility.


## Available Roles

These are the current roles that can be granted to users within your organization:

- `Owner`: A user with full control over all settings and systems in the Data Map. Can create all types of users.
- `Contributor`: A user with full control over all settings and systems in the Data Map except for some organization-wide system configurations like storage and messaging for privacy requests. Can create all types of users except `Owners`.
- `Viewer`: A user with read-only access to all settings and systems in the Data Map.
- `Viewer + Approver`: A user with read-only access to all settings and systems in the Data Map who can review and respond to privacy requests.
- `Approver`: A user who can only approve and respond to privacy requests in the Privacy Request UI.


## Adding roles

### Logging in for the first time

The first time that you log into the system you will need to use the `root user` that Fides ships with to create new users. We recommend avoiding using the root user for Fides management other than this initial account creation.

The root user is automatically granted all possible scopes.

### Setting up your first user 

Login as the root user using the `root_username` and `root_password`.

Note: this info was likely configured during installation in the security section of `fides.toml` but may also be set using the `FIDES__SECURITY__ROOT_USERNAME` and `FIDES__SECURITY__ROOT_PASSWORD` environment variables.


![Login as root](../../../public/assets/img/configuration/login_as_root.png)

Navigate to Management > Users and click on `Add New User`.

![User tab](../../../public/assets/img/configuration/user_tab.png)

Complete the fields for Username (typically email), First Name, Last Name, and a strong password. Click `Save`.

![Create your own user](../../../public/assets/img/configuration/create_user.png)

Once saved, the Permissions tab becomes accessible. Select the correct role and click `Save`. As an `Owner`, you will be able to manage all settings in Fides and create additional users:

![Set Owner Perms](../../../public/assets/img/configuration/set_owner_perms.png)


### Configuring other users
To add other users, login as an `Owner` or `Contributor` account, and follow the  workflow above to assign various roles to users within your organization. In the example below, we are adding a user that can manage Privacy Requests.


Login as an `Owner` or `Contributor`:

![Login as owner](../../../public/assets/img/configuration/login_as_owner.png)


Navigate to Management > Users and click on `Add New User`. Enter the information for the Privacy Request Approver.

![Create approver user](../../../public/assets/img/configuration/create_john_doe.png)


In the Permissions tab, add the `Approver` role to that user.  This user will be given limited view access to the UI but will be able to manage Privacy Requests:

![Set Approver Perms](../../../public/assets/img/configuration/approver_role.png)


## Setting System Managers

`Owners`, `Contributors`, and `Viewers` can be assigned to systems as Data Stewards (system managers). For `Viewers`, this provides an elevated set of permissions to manage the assigned systems without changing their overall permissions. 

Note that `Owners` can edit **all** systems without being assigned as the Data Steward.

To assign systems to a user, first assign their role (ex. `Viewer`) and then use the `Assign Systems+` button to select the systems they should manage.
In this example, we click the `Viewer` row and then click `Assign Systems+`

![Viewer Role](../../../public/assets/img/configuration/viewer_role.png)


In the Assign systems modal, toggle on/off the specific systems that you want this user to manage. You may assign all systems using the `Assign all systems` toggle or use the search to filter to the set of systems you want to assign. Using the `Assign all systems` toggle with filtered results will only assign the visible systems. When you've made your choices, click `Confirm.`

![Assign Systems](../../../public/assets/img/configuration/assign_systems.png)


In this example, the user has been assigned a `Viewer` role which grants view-only access to all settings and systems in the Data Map. However, they have additionally been assigned as the Data Steward for the `Demo Analytics System` and can make updates to that specific system.

![system_list](../../../public/assets/img/configuration/system_list.png)





