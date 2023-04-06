# Authentication Strategies

These strategies give us a collection of common authentication methods to use for a variety of APIs.

## Supported strategies

- `basic`: Iterates through the available pages by incrementing the value of a query param.
- `bearer`: Uses links returned in the headers or the body to get to the next page.
- `api_key`: Uses a value from the last-retrieved object to use as a query param pointing to the next set of results.

Detailed guides for the OAuth2 strategies `oauth2_client_credentials` and `oauth2_authorization_code` can be found [here](./oauth2).

### Basic

Adds a basic authentication header to the incoming request based on the username and password provided in the configuration

#### Configuration details

- `username` (_str_): The username for the API.
- `password` (optional _str_): The password for the API, this is optional since some APIs use the username to pass API tokens and don't require a password.

#### Example

```yaml
authentication:
  strategy: basic
  configuration:
    username: <username>
    password: <password>
```

### Bearer

Adds the provided token as bearer in the authorization header of the incoming request.

#### Configuration details

- `token` (_str_): The token to use as the bearer.

#### Example

```yaml
authentication:
  strategy: bearer
  configuration:
    token: <api_key>
```

### API Key

Adds an API key to the request header, query param, or the body depending on configuration. This strategy is useful if an API uses a non-standard authentication method and you don't want to define it for each request.

#### Configuration Details

- `headers`: A list of header names with their corresponding values.
- `query_params`: A list of query param names with their corresponding values.
- `body`: A JSON object containing a key and the corresponding value. This object is merged into the body of each request.

#### Examples

The placeholder values for all forms of `api_key` authentication come from the values provided by the `connector_params`.

**headers**

```yaml
authentication:
  strategy: api_key
  configuration:
    headers:
      - name: DD-APPLICATION-KEY
        value: <app_key>
      - name: DD-API-KEY
        value: <api_key>
```

**query params**

```yaml
authentication:
  strategy: api_key
  configuration:
    query_params:
      - name: secret_key
        value: <api_token>
```

**body**

```yaml
authentication:
  strategy: api_key
  configuration:
    body: |
      {
        "key": "<api_key>"
      }
```
