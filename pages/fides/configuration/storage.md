import Callout from 'nextra-theme-docs/callout'

# Configure Storage for DSR

## What is a DSR storage destination?
Access requests produce a package of returned data upon completion. This data will need to be temporarily uploaded to a storage destination in your cloud (e.g. an S3 bucket) in order to send a download link to the user to download their DSR package.

<Callout>By design and for security, Fides never stores privacy request results locally. At least one storage destination must be configured if you wish to process access requests.</Callout>

 Storage destinations can be associated with each [Rule](../dsr_quickstart/dsr_support/execution_policies#add-a-rule) in a [DSR Request Policy](../dsr_quickstart/dsr_support/execution_policies), which gives you the flexibility to have multiple storage destinations which can be configured for each of your DSR Request Policies. Fides also allows you to configure a single storage destination that can be used as the _default_ destination when a [Rule](../dsr_quickstart/dsr_support/execution_policies#add-a-rule) is not specifically associated with a storage destination. Currently, the configuration UI in Fides configures this _default_ storage destination.

![Storage Destinations](../../../public/assets/img/resources/storage_destinations.png "Storage Destinations")

### Decide on your storage method
To configure a Storage destination, first choose a method to store your results. Fides currently supports the following methods of storage:

- **`Local`** -> This saves upload packages locally, generating a `fides_uploads` directory at the root of where Fides is installed. **Note: This destination type should only be used for testing purposes, and not to process real-world access requests.**
- **`S3`** -> DSR packages are uploaded to an S3 bucket of your choice upon completion of an access request. We recommend using S3 if you need a place to store those files in order to server them for download to your users.

## Create a storage destination

Configuring a storage destination can be done either by:
1. using the [hosted UI](#using-the-hosted-ui-basic-configuration)
2. or by making [API calls](#using-the-api-advanced-configuration), if desired for automation or advanced setup

### Using the hosted UI (basic configuration)

To get started, open up the Fides UI, navigate to the "Configure your privacy requests" page (`/privacy-request/configure`) and select the option to "Configure storage". 

Select the `S3` option, enter your configuration details, and click `Save`. By design, the `Local` storage destination does not have any attributes that can be configured, and it is not meant to be used in production setttings.

<Callout> The storage destination you've configured here will be used for _all_ of your configured policy rules, unless the rule specifies otherwise. To tie specific policy rules to specific storage destinations, you should configure your storage destinations using API calls, in the advanced ["Configure 'manual' (non-default) storage destinations"](#configure-manual-non-default-storage-destinations) below.</Callout>

#### S3 storage destination attributes
| Attribute | Description |
|---|---|
| `Format` | The format of uploaded data. Supported formats include `json` and `csv`. |
| `Auth_method` | The authentication method for creating a session with S3. Either `automatic` or `secret_keys`. |
| `Bucket` | The name of the bucket in S3. |

#### Additional credentials for S3 buckets
Fides requires authenticated access to output data to your storage destination.

<Callout> Fides supports automatically creating a session for S3. If your `auth_method` is set to `automatic`, no secrets need to be provided. Boto3 will look for credentials on the server.</Callout>

If your `auth_method` is set to `secret_keys`, you will need to also provide the following credential information for your storage destination:

| Attribute | Description |
|---|---|
| `AWS access key ID` | AWS access key id, obtained from AWS console. |
| `AWS secret access key` | AWS secret access key, obtained from AWS console. |


### Using the API (advanced configuration)

If preferred, you can also make API calls to configure your storage destination(s), rather than using the hosted UI. This may be desirable if you'd like to configure Fides as part of an automated process, or if you require advanced configuration for a specific use-case.

#### Configure a default S3 storage destination
Fides allows you to create a single _default_ S3 storage configuration. After following the steps below, this "default" configuration will be used as the storage destination for all policy rules if not configured otherwise.

##### Create a default S3 storage destination

First, create the default S3 storage destination:

```json filename="PUT /api/v1/storage/default"
{
  "type": "s3",
  "details": {
    "auth_method": "automatic",
    "bucket": "string",
    "max_retries": 0
  },
  "format": "json"
}
```

| Attribute | Description |
|---|---|
| `format` | The format of uploaded data. Supported formats include `json` and `csv`. |
| `details.bucket` | The name of the bucket in S3. |
| `details.auth_method` | The authentication method for creating a session with S3. Either `automatic` or `secret_keys`. |
| `details.max_retries` | The maximum number of retries to attempt when writing to the storage destination. |

##### Add credentials to your default S3 storage destination (if needed)

If your `auth_method` is set to `secret_keys`, you will need to also provide the following credential information for your storage destination via an additional API call:

```json filename="PUT /api/v1/storage/default/s3/secret"
  {
    "aws_access_key_id": "{{aws_access_key_id}}",
    "aws_secret_access_key": "{{aws_secret_access_key_id}}"
  }

```

See [additional credentials for S3 buckets](#additional-credentials-for-s3-buckets) section for details on these credentials.

##### Set `s3` as the active default storage destination

In order to make Fides actually use your default S3 storage configuration in privacy request execution, i.e. for all policy rules that do not have any other storage destination configured, you must make the following API call:

```json filename="PATCH /api/v1/config"
  {
    "storage": {
      "active_default_storage_type": "s3"
    }
  }
```

<Callout> Out of the box, Fides assumes a `Local` storage destination as the active storage destination used for all policy rules that do not have ay storage destination configured. This should not be used for production use cases, so users should configure a default S3 storage destination, either through the UI or with the API calls described here. </Callout>

##### Check the default storage status

To check that the current active default storage destination is set to an S3 storage destination that's fully configured, you can invoke the following endpoint:

```json filename="GET /api/v1/storage/default/status"
{
    "config_status": "configured",
    "detail": "Active default storage location of type s3 is fully configured"
}
```

This can help you confirm that you've done what's needed to configure an S3 storage destination and that Fides will use it as the active default.

#### Configure _manual_ (non-default) storage destinations

If you want even more fine grained control and do not want to only rely on a _default_ storage configuration, you can also configure _manual_ storage configurations and explicitly associate them with given policy rules. This allows you to output particular types of requested data to particular storage destinations, for example.

##### Create your storage destination
To create new _manual_ storage destinations, use the following endpoint:

`PATCH /api/v1/storage/config/`

Here is an example of the expected request body:

````json filename="Example Request: DSR Destination Configuration" 
  {
    "destinations": [
      {
        "name": str,
        "key": FidesKey (optional),
        "type": str,
        "format": str
        "details": {
          # s3
          "auth_method": str,
          "bucket": str,
          "naming": str,
        }
      }
    ]
  }

````

##### Destination attributes
| Attribute | Description |
|---|---|
| `name` | A unique user-friendly name for your storage destination. |
| `key` | A unique key used to manage your storage destination. This is auto-generated from `name` if left blank. Accepted values are alphanumeric, `_`, and `.`. |
| `type` | Type of storage destination. Supported types include `s3`, and `local`. You may configure multiple destinations of the same type. |
| `format` | The format of uploaded data. Supported formats include `json` and `csv`. |

##### Additional attributes for S3 buckets
| Attribute | Description |
|---|---|
| `auth_method` | The [authentication method](#authenticate-with-your-destination) for creating a session with S3. Either `automatic` or `secret_keys`. |
| `bucket` | The name of the bucket in S3. |
| `naming` | This defines how the uploaded files will be named. Currently, Fides only supports upload file naming by `request_id`. Use this value for all your storage destinations. |

##### Additional attributes for local storage
| Attribute | Description |
|---|---|
| `naming` | This defines how the uploaded files will be named. Currently, Fides supports upload file naming by `request_id`. Use this value for all your storage destinations. |

On success, the response from the above endpoint will include a `storage_key` for each destination, which can be used when defining a DSR request policy [Rules](../dsr_quickstart/dsr_support/execution_policies#add-a-rule).

````json filename="**Example Response:** DSR Destination Configuration" 
{
    "items": [
        {
            "id": "sto_fe4e4dc0-b5d3-4ac1-bfcd-86e60e9891b9",
            "name": "s3 storage 2",
            "type": "s3",
            "details": {
                "auth_method": "secret_keys",
                "bucket": "my-bucket",
                "naming": "request_id",
                "object_name": "requests"
            },
            "key": "s3_storage_2"
        }
    ],
    "total": 1,
    "page": 1,
    "size": 1
}
```` 

##### Authenticate with your destination
If your `auth_method` is set to `secret_keys`, you will need to also provide the following credential information for your storage destination via an additional API call.

Use the `storage_key` returned during your storage creation to provide access credentials:

```json filename="PUT {host}/api/v1/storage/config/{storage_key}/secret"
  {
    # s3
    "aws_access_key_id": str,
    "aws_secret_access_key": str
  }

```

See [additional credentials for S3 buckets](#additional-credentials-for-s3-buckets) section for details on these credentials.

### Test your storage connection

To test that your storage destination works correctly, you can call the `upload` endpoint directly. Specify a `request_id` in the path with an arbitrary string:

````json filename="PUT {host}/api/v1/storage/{request_id}"
  {
    "storage_key": {storage_key},
    "data": {
      #data here
    }
  }

````

| Attribute | Description |
|---|---|
| `storage_key` | The key associated with the storage destination. |
| `data` | A dictionary of arbitrary data you wish to upload to storage destination. |


## Extensibility
Fides can be extended to support additional storage destinations by:

1. Adding destination-specific enums in `src/fides/ops/schemas/storage/storage.py`
2. Implementing an authenticator in `src/fides/ops/service/storage/storage_authenticator_service.py`
3. Implementing the uploader in `src/fides/ops/service/storage/storage_uploader_service.py`
