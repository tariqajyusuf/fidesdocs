# Introduction to customization

The SaaS config specification is designed in a way that allows for varying levels of customization.

- **No customization**: Utilizing only the fields specified in the [SaaS config](../advanced_configuration/saas_configuration) and the strategies bundled with Fides. This approach is suitable for standard use cases where the provided strategies are sufficient to meet your needs.

- **Custom strategies**: Implementing custom logic for predefined extension points, such as authentication, pagination, and postprocessing strategies, while still allowing Fides to build and execute requests. This level of customization is ideal when you need to customize only specific parts of the request process but want to leverage Fides for the overall request handling.

- [**Request overrides**](./request_overrides.md): Complete override of the way a request is built and executed. This approach is best suited for cases that require custom business logic or complex customizations that go beyond the capabilities of custom strategies. With request overrides, you have full control over the request process, offering the highest level of flexibility and customization.

## Custom strategies

The initial level of customization begins with the creation of new strategies. If there is a requirement for a non-standard authentication, pagination, or postprocessor strategy, you can develop a custom one using Python.

## Registering a custom strategy

All custom strategies can be registered using one of these approaches.

### Include in the Fides project

If you're submitting the custom strategy as an open-source contribution, place the Python file containing your custom strategy in the [override_implementations](https://github.com/ethyca/fides/tree/main/src/fides/api/ops/service/saas_request/override_implementations) directory within the Fides project. The code in this directory will be dynamically loaded during server startup without the need to update any imports.

### Include in a custom connector template

This method is covered in [Custom Connector Templates](./register_custom_template).

## Authentication strategy example

Here's an example of a custom Doordash authentication strategy.

```python filename="authentication_strategy_doordash.py"
import math
import time
from typing import Any, Dict, Optional

import jwt.utils
from requests import PreparedRequest

from fides.api.ops.models.connectionconfig import ConnectionConfig
from fides.api.ops.schemas.saas.strategy_configuration import StrategyConfiguration
from fides.api.ops.service.authentication.authentication_strategy import (
    AuthenticationStrategy,
)
from fides.api.ops.util.saas_util import assign_placeholders


class DoordashAuthenticationConfiguration(StrategyConfiguration):
    """
    Parameters to generate a Doordash JWT token
    """

    developer_id: str
    key_id: str
    signing_secret: str


class DoordashAuthenticationStrategy(AuthenticationStrategy):
    """
    Adds a Doordash JWT as bearer auth to the request
    """

    name = "doordash"
    configuration_model = DoordashAuthenticationConfiguration

    def __init__(self, configuration: DoordashAuthenticationConfiguration):
        self.developer_id = configuration.developer_id
        self.key_id = configuration.key_id
        self.signing_secret = configuration.signing_secret

    def add_authentication(
        self, request: PreparedRequest, connection_config: ConnectionConfig
    ) -> PreparedRequest:
        """
        Generate a Doordash JWT and add it as bearer auth
        """

        secrets: Optional[Dict[str, Any]] = connection_config.secrets

        token = jwt.encode(
            {
                "aud": "doordash",
                "iss": assign_placeholders(self.developer_id, secrets)
                if secrets
                else None,
                "kid": assign_placeholders(self.key_id, secrets) if secrets else None,
                "exp": str(math.floor(time.time() + 60)),
                "iat": str(math.floor(time.time())),
            },
            jwt.utils.base64url_decode(
                assign_placeholders(self.signing_secret, secrets)  # type: ignore
            ),
            algorithm="HS256",
            headers={"dd-ver": "DD-JWT-V1"},
        )

        request.headers["Authorization"] = f"Bearer {token}"
        return request

```

### Explanation

- The required fields need to be defined in a class that extends `StrategyConfiguration`.
- The custom strategy needs to extend `AuthenticationStrategy`.
- The strategy name is defined under the `name` field, this is how you refer to this strategy from the SaaS config.
- The configuration class is assigned to `configuration_model` field.
- Implement the `add_authentication` method, which takes a `PreparedRequest` and `ConnectionConfig`. Any attribute of the `PreparedRequest` can be updated to authenticate the request.

## Usage

To use this custom `doordash` strategy in a SaaS config you need to:

- set the authentication strategy to `doordash`
- set the required parameters for the authentication strategy in the `connector_params`
  - `developer_id`
  - `key_id`
  - `signing_secret`

```yaml
connector_params:
  - name: domain
    default_value: openapi.doordash.com
  - name: developer_id
    label: Developer ID
  - name: key_id
    label: Key ID
  - name: signing_secret

client_config:
  protocol: https
  host: <domain>
  authentication:
    strategy: doordash
    configuration:
      developer_id: <developer_id>
      key_id: <key_id>
      signing_secret: <signing_secret>
```

With this custom authentication strategy in place, the SaaS connector framework will call the custom `add_authentication` function whenever it needs to authenticate an HTTP request for the Doordash connector.

## Pagination and postprocessor strategies

The current pagination and postprocessor strategies are designed to cover a wide range of use cases. For this reason, examples of custom versions of these strategies are omitted from this guide. However, if needed, you can refer to the common [pagination](https://github.com/ethyca/fides/tree/main/src/fides/api/ops/service/pagination) and [postprocessor](https://github.com/ethyca/fides/tree/main/src/fides/api/ops/service/processors/post_processor_strategy) strategies from the Fides project as a starting point.
