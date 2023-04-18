import Callout from 'nextra-theme-docs/callout'

# Configure Email/SMS Messaging
## What is email/SMS used for?

Fides supports email and SMS server configurations for sending processing notices to privacy request subjects. Future updates will support outbound email communications with data processors.

Supported modes of use:

- **Subject Identity Verification** - Used to verify subject identity before proceeding with their privacy request. For more information on identity verification in subject requests, see the [Privacy Requests](./privacy_requests#enable-subject-identity-verification) guide.
- **Request Receipt Notification** - Used to send subject notifications upon privacy request receipt.
- **Request Review Notification** - Used to send subject notifications upon privacy request review. Includes denial reason of the request, if applicable.
- **Request Completion Notification** - Used to send subject notifications upon privacy request completion. Includes link to download data package, if applicable.


## Prerequisites

Fides currently supports Mailgun for email messaging, and both Mailgun and Twilio for SMS messaging.

### Mailgun
When using Mailgun, ensure you register or use an existing Mailgun account in order to get up and running with email communications.

Mailgun can be setup to either use Mailgun templates, allowing for customization, or the generic Fides template.

#### Using Mailgun templates

1. Within Mailgun create a template named `fides`
1. The template can be setup as desired, but needs to contain a `{{{fides_email_body}}}`
variable. This is where the Fides email text will be placed.
1. In order to use the email template the Mailgun private API key needs to be provided in the
Fides Mailgun configuration.

When sending emails Fides will check to see if the `fides` template is available and use
it if so. If a `fides` template is not found the email will fall back to using the generic
Fides email template.

#### Using the default fides template

1. Generate a Mailgun Domain Sending Key

    Follow the [Mailgun documentation](https://documentation.mailgun.com/en/latest/api-intro.html#authentication-1) to create a new Domain Sending Key for Fides.

Alternatively the Mailgun private API key will also work for this option, but is not required.

### Twilio SMS

To configure messaging via SMS, you will need your Account SID and Auth Token (viewable in the `Api keys and tokens` section of your account settings), and either your Messaging Service ID or your Twilio sender phone number (Both available in your Twilio console). 

![Twilio SID and Auth Token](../../../../public/assets/img/dsr_quickstart/twilio_auth_tokens.png)

Use your messaging service ID if you've set up a specific messaging service in Twilio, otherwise use your Twilio sender phone number.


### Twilio Email (Sendgrid)

To configure messaging via email, you will need generate a Twilio API key.

Follow the [Twilio documentation](https://www.twilio.com/docs/iam/keys/api-key) to create a new API key for Fides.

## Configuration

### Add necessary config variables

You'll need to set up config variables to send out messages from Fides. Refer to [the configuration reference](../../get_started/configuration#configuration-variable-reference) for more details.

The following is an example set of relevant configuration options to enable all notification types, using a `mailgun` service type:

```js
FIDES__EXECUTION__SUBJECT_IDENTITY_VERIFICATION_REQUIRED=true
FIDES__NOTIFICATIONS__NOTIFICATION_SERVICE_TYPE=mailgun
FIDES__NOTIFICATIONS__SEND_REQUEST_COMPLETION_NOTIFICATION=true
FIDES__NOTIFICATIONS__SEND_REQUEST_RECEIPT_NOTIFICATION=true
FIDES__NOTIFICATIONS__SEND_REQUEST_REVIEW_NOTIFICATION=true
```

The following service types are accepted as a `FIDES__NOTIFICATIONS__NOTIFICATION_SERVICE_TYPE`:

- `mailgun`
- `twilio_text`
- `twilio_email`

These service types must correspond to the `service_type` in one of your messaging configs in the database.


### Create the messaging configuration

#### Mailgun Config

```json filename="POST api/v1/messaging/config"
{
    "key": "{{messaging_config_key}}",
    "name": "mailgun",
    "service_type": "mailgun",
    "details": {
        "domain": "your.mailgun.domain"
    }
}
```

#### Twilio SMS Config

```json filename="POST api/v1/messaging/config"
{
    "key": "{{twilio_config_key}}",
    "name": "twilio",
    "service_type": "twilio_text"
}
```

| Field          | Description                                                                                                                                                      |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `key`          | *Optional.* A unique key used to manage your messaging config. This is auto-generated from `name` if left blank. Accepted values are alphanumeric, `_`, and `.`. |
| `name`         | A unique user-friendly name for your messaging config.                                                                                                           |
| `service_type` | The email service to configure. Currently, Fides supports `mailgun`, `twilio_email`, and `twilio_text`.                                                          |
| `details`      | A dict of key/val config vars specific to the messaging service.                                                                                                 |
| `domain`       | Your unique Mailgun domain.                                                                                                                                      |
| `is_eu_domain` | *Optional.* A boolean that denotes whether your Mailgun domain was created in the EU region. Defaults to `False`.                                                |
| `api_version`  | *Optional.* A string that denotes the API version. Defaults to `v3`.                                                                                             |


### Add the messaging configuration secrets 

#### Mailgun Secrets

```json filename="PUT api/v1/messaging/config/{{messaging_config_key}}/secret"
{
    "mailgun_api_key": "{{mailgun_api_key}}",
}

```

#### Twilio SMS Secrets

```json filename="PUT api/v1/messaging/config/{{messaging_config_key}}/secret"
{
    "twilio_account_sid": "{{twilio_account_sid}}",
    "twilio_auth_token": "{{twilio_auth_token}}",
    "twilio_messaging_service_sid": "{{twilio_messaging_service_id}}"
}

```

#### Twilio Email Secrets

```json filename="PUT api/v1/messaging/config/{{messaging_config_key}}/secret"
{
    "twilio_api_key": "{{twilio_api_key}}",
}

```

| Field                          | Description                                                                                                                |
|--------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| `mailgun_api_key`              | Your Mailgun Domain Sending Key.                                                                                           |
| `twilio_account_sid`           | Your Twilio Account SID.                                                                                                   |
| `twilio_auth_token`            | Your Twilio Auth Token.                                                                                                    |
| `twilio_messaging_service_sid` | Your Twilio Messaging Service SID. One of `twilio_messaging_service_sid` or `twilio_sender_phone_number` must be provided. |
| `twilio_sender_phone_number`   | Your Twilio Sender Phone Number. One of `twilio_messaging_service_sid` or `twilio_sender_phone_number` must be provided.   |
| `twilio_api_key`               | Your Twilio API Key.                                                                                                       |

