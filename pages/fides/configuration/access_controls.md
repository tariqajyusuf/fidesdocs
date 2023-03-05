# Role-Based Access Controls

Fides uses Role-Based Access Controls.  Users can be assigned various roles within the organization that grant them a specific set of scopes (permissions).  To get started, login as the root user to create your initial user. From there, you can create other users in your organization with various levels of responsibility.


## Available Roles

These are the current roles that can be granted to users within your organization:

- Owner: Admin permissions
- Contributor: Nearly admin, except for setting up system configuration like storage and messaging
- Viewer + Approver: Full read and can approve Privacy Requests
- Viewer: Full read
- Approver: Limited read and can approve Privacy Requests


## Adding roles

### Configuring the root user

To create users in the system, you need an initial user that *already* has permission to create users.  The Fides installation ships with a root user for this purpose.  You should typically avoid using the root user for Fides management other than for an Owner to create their user account.


The root user is automatically granted all possible scopes.

### Setting up your user 

Login as the root user.  Use the `root_username` and `root_password` you added to the security section of `fides.toml` 
file, or the values of your `FIDES__SECURITY__ROOT_USERNAME` and `FIDES__SECURITY__ROOT_PASSWORD` environment variables.


![Login as root](../../../public/assets/img/configuration/login_as_root.png)

Navigate to Management > Users.  Click on `Add New User`.

![User tab](../../../public/assets/img/configuration/user_tab.png)

Add your username, your first and last name, and a strong password. Click `Save`.

![Create your own user](../../../public/assets/img/configuration/create_user.png)

On the Permissions tab, select the `Owner` row and click `Save`. As Owner, you will automatically inherit all possible Fides scopes:

![Set Owner Perms](../../../public/assets/img/configuration/set_owner_perms.png)


### Configuring other users
To configure other users, login as a newly created Owner, and follow the same workflow above to assign various roles to users within your organization. In the example below, we are adding a user that can manage Privacy Requests.


Login as an Owner:

![Login as owner](../../../public/assets/img/configuration/login_as_owner.png)


Create a user to manage Privacy Requests:

![Create approver user](../../../public/assets/img/configuration/create_john_doe.png)


In the Permissions tab, add the `Approver` role to that user.  This user will be given limited read but will be able to manage Privacy Requests:

![Set Approver Perms](../../../public/assets/img/configuration/approver_role.png)


## Setting System Managers

You can additionally assign users as system managers which will give them the ability to manage the specific systems for which they have been assigned.  A typical workflow might be giving a user a `Viewer` role, and then assigning the system manager permissions to just the systems you want them to edit.

Note that assigning a user to a specific system formerly denotes their responsibility for that system, but there are other users who may have permission to edit the system details.  For example, `Owners` can edit all system details without being assigned as system manager due to having a role with broad admin access.

To assign a system manager, first assign a role to the user, and then link specific systems to that user for which they are responsible.
In this example, we click the `Viewer` row and then click `Assign Systems +`

![Viewer Role](../../../public/assets/img/configuration/viewer_role.png)


In the Assign Systems modal, toggle the specific systems for which you want the given user to be able to manage. Click `Confirm.`

![Assign Systems](../../../public/assets/img/configuration/assign_systems.png)


In this example, the user now has a Viewer role and therefore has read permissions to most of Fides. They also are system manager of `Demo Analytics System` and can make changes to that specific system.

![system_list](../../../public/assets/img/configuration/system_list.png)





