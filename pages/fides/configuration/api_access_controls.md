# User Management via the API

Fides uses Role-Based Access Controls which means that users can be assigned various roles within the organization that grant them a specific set of scopes (permissions). You can also optionally designate certain users as system managers who are responsible for specific systems. Here we discuss how to manage user permissions via the API directly.



## Available Roles

These are the current roles that can be granted to users within your organization:

- Owner:  Full control over all settings and systems in the Data Map.
- Contributor: Full control over all settings and systems in the Data Map except for organization-wide system configurations like storage and messaging.
- Viewer + Approver: Read-only access to all settings and systems in the Data Map + can review and respond to privacy requests.
- Viewer: Read-only access to all settings and systems in the Data Map.
- Approver: Limited read and can approve Privacy Requests

To view the granular scopes associated with each role:

*GET /oauth/role*

```json
{
  "owner": [
    "cli-objects:create",
    "cli-objects:delete",
    "cli-objects:read",
    "cli-objects:update",
    "client:create",
    "client:delete",
    "client:read",
    "client:update",
    ...
  ],
  "viewer": [
    "cli-objects:read",
    "client:read",
    "config:read",
    "connection:read",
    "connection_type:read",
    "consent:read",
    "datamap:read",
    "dataset:read",
    ...
  ],
  ...
}

```

## Adding roles

### Configuring the root user

To create users in the system, you need an initial user that *already* has permission to create users.  The Fides installation ships with a root user for this purpose.  You should typically avoid using the root user for Fides management other than for an `Owner` to create their user account.

A root user can be created by adding a `root_username` and `root_password` to the  security section of `fides.toml` file, or by setting `FIDES__SECURITY__ROOT_USERNAME` and `FIDES__SECURITY__ROOT_PASSWORD` environment variables.

The root user is automatically granted all possible scopes.

### Setting up your user 

Login as the root user:

`POST /login`

```json
{
    "username": "{root_username}",
    "password": "{root_password}"
}
```

Create the user you will use to manage Fides:


`POST /user`

```json
{
  "username": "my_username",
  "first_name": "First Name",
  "last_name": "Last Name",
  "password": "**************",
}
```

Add the `owner` role to your user:

`PUT /user/{user_id}/permission`

```json
{
    "roles": ["owner"]
}
```

Owners automatically inherit all possible Fides scopes.

### Configuring other users

To configure other users, login as your user, and follow the same workflow above to assign various roles to users within your organization. In the example below, we are adding a user that can manage Privacy Requests:


Login as owner:

`POST /login`

```json
{
    "username": "{your_username}",
    "password": "{your_password}"
}
```

Create a user to manage Privacy Requests:

`POST /user`

```json
{
  "username": "username",
  "first_name": "First Name",
  "last_name": "Last Name",
  "password": "**************",
}
```

Add the `approver` role to that user:

`PUT /user/{user_id}/permission`

```json
{
    "roles": ["approver"]
}
```

Approvers have limited read but can manage Privacy Requests.

### Changing passwords

Share the username and password with applicable users in a secure way. They can login and then change their password:

`POST /user/{user_id}/reset-password`

```json
{
    "old_password": "{***********}",
    "new_password": "{*****************}"
}
```

## System Managers

Fides supports being able to configure users as system managers, giving them permission to manage details for just that system or systems.


### Adding a user as system manager

Pass in a list of system keys for which the user should be system manager:

`PUT /user/{user_id}/system-manager`

```json 
["system_key_1", "system_key_2"]
```


### Get systems for which the user is manager

The following request returns a detailed representation of all systems the user can manage:

`GET /user/{user_id}/system-manager`


### Remove user as system manager

The following request unlinks the user as manager of the given system:

`DELETE /user/{user_id}/system-manager/{system_key}`


## Adding scopes directly

There might be occasions where you want to create tokens with a custom set of scopes not covered by roles, either for API-driven workflows, or to create a token that can only do a singular task.

### Get a root token

`POST /oauth/token`

A root client can be created by adding an oauth_root_client_id and oauth_root_client_secret to the security section of fides.toml file, or by setting `FIDES__SECURITY__OAUTH_ROOT_CLIENT_ID` and `FIDES__SECURITY__OAUTH_ROOT_CLIENT_SECRET` environment variables.

Get a root client token, by passing in your root `client_id` and `client_secret` as form data. 

`POST /oauth/token`

This will return an access token with full scopes.


### Create a client

Create a client with the specific set of scopes you'd like to assign.  The request should use the root client token for authentication.

`POST /oauth/client`

```json    
[
    "config:read"
]

```

### Create a client token

Pass in the newly-created `client_id` and `client_secret` returned from the previous request as form data to create a client token with the associated scopes.

`POST /oauth/token`

In this example, this particular token will only have `config:read` scopes.


## Previewing all available scopes

The GET scopes endpoint will return a list of all individual scopes available to be assigned to specific clients.

`GET /oauth/scope`
