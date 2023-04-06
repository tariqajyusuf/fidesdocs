# Request Overrides

The request overrides feature provides a way to register, maintain, and use custom functions that act as overrides to SaaS request execution. This feature can be helpful when the built-in SaaS request functionalities are insufficient for specific use cases. Consider this read request definition.

```
endpoints:
  - name: user
    requests:
      read:
        method: GET
        path: /api/v2/users/search.json
        query_params:
          - name: query
            value: <email>
        param_values:
          - name: email
            identity: email
        data_path: users
```

The SaaS connector framework will automatically handle:

- Converting this to a Python `request`
- Adding authentication
- Executing the request and handling the response
- Executing any defined pagination and postprocessor strategies

However, in place of this auto-generated request, we can define a custom function that is called whenever the SaaS connector framework needs to read or update data from a collection.

## Registering a request override

Fides has a `@register` decorator to automatically validate and register request overrides. It accepts the `name` of the request override, and list of request types it can be used for.

```
@register("twilio_user_update", [SaaSRequestType.UPDATE])
```

The registration of request overrides are visible in the debug logs

> Registering new SaaS request override function 'twilio_conversation_message_update' under name 'twilio_conversation_message_update' for SaaSRequestType SaaSRequestType.UPDATE

The request overrides are validated differently based on which request types they can be used for. Here are the expected method signatures for the different request types.

### Read

```python
@register("request_override_name", [SaaSRequestType.READ])
def request_override_name(
    client: AuthenticatedClient,
    node: TraversalNode,
    policy: Policy,
    privacy_request: PrivacyRequest,
    input_data: Dict[str, List[Any]],
    secrets: Dict[str, Any],
) -> List[Row]:
```

- `client` - An HTTP client with pre-defined authentication derived from the SaaS config's `client_config`
- `node` - A `TraversalNode` which can be used to access additional context information for the current request.
- `policy` - The `Policy` associated with the current privacy request.
- `privacy_request` - The original `PrivacyRequest` that triggered the current execution.
- `input_data` - A dictionary of the data requested for this function, specified on the SaaS config by the `param_values` field.
- `secrets` - Access to the secrets for the current connection.

### Update, Delete, Data Protection Request

```python
@register("request_override_name", [SaaSRequestType.UPDATE])
def request_override_name(
    client: AuthenticatedClient,
    param_values_per_row: List[Dict[str, Any]],
    policy: Policy,
    privacy_request: PrivacyRequest,
    secrets: Dict[str, Any],
) -> int:
```

- `client` - An HTTP client with pre-defined authentication derived from the SaaS config's `client_config`
- `param_values_per_row` - The data returned from the corresponding `read` request (if available).
- `policy` - The `Policy` associated with the current privacy request.
- `privacy_request` - The original `PrivacyRequest` that triggered the current execution.
- `secrets` - Access to the secrets for the current connection.

## Example

Here is a request override for Twilio user updates where the update payload for a masking request needed to be converted to Pascal case before posting to the Twilio API.

```python filename="twilio_request_overrides.py"
from typing import Any, Dict, List

from multidimensional_urlencode import urlencode as multidimensional_urlencode

from fides.api.ops.models.policy import Policy
from fides.api.ops.models.privacy_request import PrivacyRequest
from fides.api.ops.schemas.saas.shared_schemas import HTTPMethod, SaaSRequestParams
from fides.api.ops.service.connectors.saas.authenticated_client import (
    AuthenticatedClient,
)
from fides.api.ops.service.saas_request.saas_request_override_factory import (
    SaaSRequestType,
    register,
)
from fides.api.ops.util.saas_util import to_pascal_case


@register("twilio_user_update", [SaaSRequestType.UPDATE])
def twilio_user_update(
    client: AuthenticatedClient,
    param_values_per_row: List[Dict[str, Any]],
    policy: Policy,
    privacy_request: PrivacyRequest,
    secrets: Dict[str, Any],
) -> int:
    rows_updated = 0

    for row_param_values in param_values_per_row:
        # get params to be used in update request
        user_id = row_param_values.get("sid")

        # rewrite with a format that can be accepted by Twilio
        masked_object_fields = row_param_values["masked_object_fields"]

        for k in masked_object_fields.copy().keys():
            new_key = to_pascal_case(k)
            masked_object_fields[new_key] = masked_object_fields.pop(k)

        update_body = masked_object_fields

        client.send(
            SaaSRequestParams(
                method=HTTPMethod.POST,
                path=f"/v1/Users/{user_id}",
                headers={"Content-Type": "application/x-www-form-urlencoded"},
                body=multidimensional_urlencode(update_body),
            )
        )

        rows_updated += 1
    return rows_updated
```

### Explanation

- Iterate over every record in `param_values_per_row`.
- Read the `sid` value and map it to the `user_id`.
- Take the [masked_object_fields](../advanced_configuration/saas_configuration#generating-requests) and make the necessary modifications.
- Use the existing `client` to post this custom payload to the Twilio's `/v1/Users/` endpoint.

## Usage

To incorporate a request override in a SaaS config, add the `request_override` key with the name of the custom function as its value.

```yaml
update:
  request_override: twilio_user_update
  param_values:
    - name: sid
      references:
        - dataset: twilio
          field: user.sid
          direction: from
```

In this example, the `param_values` field specifies that the value of the `sid` parameter should be obtained from the `user.sid` field in the `twilio` dataset. This value will be passed into the `twilio_user_update` request override function.
