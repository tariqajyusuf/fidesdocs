## Create a connection from a connector template via API

To create all the resources necessary to set up a SaaS connection in one request, you can create a connection from
a connector template. This creates a `saas` connection with your supplied name and description, using your supplied `secrets`. Connections created using this method will behave exactly as connections created from the [Admin UI](../configuring_connectors), including auto-updates as new connector templates are made available.

### Available connector templates

```json filename="GET /api/v1/connection_type?system_type=saas"
{
  "items": [
    {
      "identifier": "mailchimp",
      "type": "saas",
      "human_readable": "Mailchimp",
      ...
```

### Required secrets

```json filename="GET /api/v1/connection_type/mailchimp/secret"
{
  "title": "mailchimp_schema",
  "description": "Mailchimp secrets schema",
  "type": "object",
  "properties": {
    "domain": {
      "title": "Domain",
      "type": "string"
    },
    "username": {
      "title": "Username",
      "type": "string"
    },
    "api_key": {
      "title": "Api Key",
      "type": "string"
    }
  },
  "required": [
    "domain",
    "username",
    "api_key"
  ],
  "additionalProperties": false
}
```

### Instantiating the connector via API

The example below creates a [Mailchimp](../available_connectors/mailchimp) SaaS connection, and would need the relevant Mailchimp `secrets`.

Your `instance_key` will become the identifier for the related [Dataset](../../dsr_quickstart/dsr_support/datasets). By default, the SaaS connection config is enabled with write access.

```json filename="POST /connection/instantiate/mailchimp"
{
    "name": "My Mailchimp connector",
    "description": "Production Mailchimp Instance",
    "secrets": {
        "domain": "{{mailchimp_domain}}",
        "api_key": "{{mailchimp_api_key}}",
        "username": "{{mailchimp_username}}"
    },
    "instance_key": "primary_mailchimp",
}
```

# Create and configure a SaaS connection via API

This method offers a more hands-on approach to creating and configuring a SaaS connector, as it doesn't rely on an existing connector templates. While connectors created using this method won't benefit from the auto-update feature available for connectors created from registered connector templates, it provides greater flexibility and control over the connector's configuration.

1. Create a connection of type `saas`

```json filename="PATCH /api/v1/connection"
[
  {
    "name": "SaaS Application",
    "key": {saas_key},
    "connection_type": "saas",
    "access": "read"
  }
]
```

2. Add a SaaS Config (in JSON format)

```json filename="PATCH /api/v1/connection/{saas_key}/saas_config"
{
    "fides_key": "mailchimp_connector_example",
    "name": "Mailchimp SaaS Config",
    "type": "mailchimp",
    "description": "A sample schema representing the Mailchimp connector for fides"
    ...
```

3. Configure your secrets

```json filename="PUT /api/v1/connection/{saas_key}/secret"
{
  "domain": "{mailchimp_domain}",
  "username": "{mailchimp_username}",
  "api_key": "{mailchimp_api_key}"
}
```

4. Add a Dataset (in JSON format)

```json filename="PUT /api/v1/connection/{saas_key}/dataset"
[
  {
    "fides_key":"mailchimp_connector_example",
    "name":"Mailchimp Dataset",
    "description":"A sample dataset representing the Mailchimp connector for fidesops",
    "collections":[
      {
        "name":"messages"
    ...
```

## Additional considerations

The following constraints are enforced by the API validation:

1. A SaaS connector dataset cannot have any `identities` or `references` in the `fidesops_meta`. These relationships must be defined in the [SaaS config](../advanced_configuration/saas_configuration).
2. SaaS config references can only have a direction of `from`.
3. The `fides_key` between the SaaS config and the Dataset must match in order to be associated.
