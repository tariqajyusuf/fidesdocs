# Mailchimp Transactional (Consent)

## Implementation Summary

Fides uses the following Mailchimp Transactional `consent_requests` section to either add or remove the user from the allowlist 
and/or denylist according to the user's consent preferences.  

The result of opting the user in will put them on the Rejection Allowlist which will permit future emails to be delivered.
Opting the user out will put the user on the Rejection Denylist which will cause future emails to be rejected.


|Consent Request | Description |
|----|----|
| Opt-in | [Adds an email to your email rejection allowlist.](https://mailchimp.com/developer/transactional/api/allowlists/add-email-to-allowlist/)|
| Opt-out | [Removes an email from the allowlist](https://mailchimp.com/developer/transactional/api/allowlists/remove-email-from-allowlist/) followed by a request to [add an email to your email rejection denylist.](https://mailchimp.com/developer/transactional/api/rejects/add-email-to-denylist/)|


## Connection Settings

Connection instructions may be found in the [configuration guide](../saas_config).

Note that a sequence of opt-in and/or opt-out requests can be defined that will be called 
in order.


## Example Mailchimp Transactional (Mandrill) Configuration

```yaml
saas_config:
  fides_key: mailchimp_transactional_connector
  name: Mailchimp Transactional SaaS Config
  type: mailchimp_transactional
  description: A sample schema representing the Mailchimp Transactional (Mandrill) connector for Fides
  version: 0.0.1

  connector_params:
    - name: domain
      default_value: mandrillapp.com/api/1.0
    - name: api_key

  client_config:
    protocol: https
    host: <domain>
    authentication:
      strategy: api_key
      configuration:
        body: |
          {
            "key": "<api_key>"
          }
          
  test_request:
    method: GET
    path: /users/ping


  consent_requests:
    opt_in:
      method: POST
      path: /allowlists/add
      param_values:
        - name: email
          identity: email
      body: |
        {
          "email": "<email>"
        }
        
    opt_out:
      - method: POST
        path: /allowlists/delete
        param_values:
          - name: email
            identity: email
        body: |
          {
            "email": "<email>"
          }
      - method: POST
        path: /rejects/add
        param_values:
          - name: email
            identity: email
        body: |
          {
            "email": "<email>"
          }
          
  endpoints: []
```
