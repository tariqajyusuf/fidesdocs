# SaaS Connectors

## What is a SaaS connector?

A Fides SaaS (Software as a Service) connector allows a user to connect to a third-party application (e.g., Mailchimp, Stripe, Hubspot), and execute data access and erasure requests against that application. Fides represents your SaaS connectors as a [Dataset](../dsr_support/datasets), accessed via a [Connection](../dsr_support/database_connectors), and configured by a [SaaS config](./advanced_configuration/saas_configuration).

## Supported SaaS applications

The current implementation of the SaaS framework can natively support any SaaS application that uses these features:

- Basic auth, bearer auth, OAuth2 (authorization code and client credential flows).
- Data access and erasure via HTTP requests.
- Common forms of pagination based on headers and response contents.
- Retry handling based on common HTTP status codes and headers.

Custom use cases can also be implemented using [custom strategies](./advanced_configuration/custom_strategies) and [request overrides](./advanced_configuration/request_overrides) but these approaches are not configuration driven and require Python knowledge. For full examples of supported connectors, see the [Available Connectors](./available_connectors/adobe).
