import Callout from 'nextra-theme-docs/callout'

# Scan Infrastructure with the CLI 

## Overview
Fides ships with several CLI-based scanners to connect to your databases, services, or applications, and create Fides-compatible resource templates for use in your [CI/CD pipelines](./cicd) and [data maps](./generate_datamaps). 

The Fides CLI provides a `generate` command to connect third-party service and automatically generate a YAML-based resource file based on the contained resources. The `scan` command is available to compare your existing resources against what is defined in your Fides server, or against your resource manifest files, to ensure any updates remain compliant. These commands are available for a variety of [databases](./generate_resources) and [services](#scan-your-infrastructure).

The `scan` and `generate` commands work best when used in tandem. The Fides format must be followed to ensure coverage.

### Scan your infrastructure

Fides can scan [Okta](#working-with-an-okta-account), [AWS](#scan-aws-resources) resources to generate system declarations and datasets. Fides _systems_ describe any services that store or process data for your organization, including third-party APIs, web applications, databases, and data warehouses.

<Callout>To learn how Fides can scan your infrastructure using the UI, check out the [data map guides](../data_mapping/scanners).</Callout>


## Scan AWS resources
The `generate` command can connect to your AWS account and automatically generate resource files based on the contents. 

### Providing Credentials
AWS credentials can be supplied as a command option, or using the Fides [configuration](../get_started/configuration). 

#### Command line
Credentials can be directly supplied in your command using the `access_key_id`, `secret_access_key`, and `region` options.
```sh
fides generate system aws \ 
--access_key_id "<my_access_key_id>"
--secret_access_key "<my_secret_access_key>"
--region "us-east-1"
...
```

#### Environment variables
To authenticate with environment variables, set an `SECRET_ACCESS_KEY` and `ACCESS_KEY_ID`, as defined by [boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#using-environment-variables):
```sh
export AWS_ACCESS_KEY_ID="<my_access_key_id>"
export AWS_SECRET_ACCESS_KEY="<my_access_key>"
export AWS_DEFAULT_REGION="us-east-1"
```

It is also possible to reference a profile:
```sh
export AWS_PROFILE="my_profile_1"
export AWS_DEFAULT_REGION="us-east-1"
```

#### Configuration files
Credentials can be defined within your [Fides configuration](../get_started/configuration) under the credentials section.

```sh
[credentials]
my_aws_credentials = {aws_access_key_id="<my_aws_access_key_id>", aws_secret_access_key="<my_aws_secret_access_key>", region_name="us-east-1"}
```

Your command can then reference the key defined in your config:
```sh
...
--credentials-id "my_aws_credentials"
...
```

If persisting your keys to a config file is problematic, it is possible to use an environment variable to set credentials values. To use a secret access key and ID, set the environment variable with a prefix of `FIDES__CREDENTIALS__` and `__` as the nested key delimiter:
```sh
export FIDES__CREDENTIALS__MY_AWS_CREDENTIALS__AWS_ACCESS_KEY_ID="<my_aws_access_key_id>"
export FIDES__CREDENTIALS__MY_AWS_CREDENTIALS__AWS_SECRET_ACCESS_KEY="<my_aws_secret_access_key>"
```
##### Required Permissions

The identity which is authenticated must be allowed to invoke the following actions:

- `redshift:DescribeClusters`
- `rds:DescribeDBInstances`
- `rds:DescribeDBClusters`

These permissions can be supplied with an IAM policy like the following:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "redshift:DescribeClusters",
                "rds:DescribeDBInstances",
                "rds:DescribeDBClusters",
                "tag:GetResources",
            ],
            "Resource": "*"
        }
    ]
}
```

### Filtering AWS resources

It is possible to filter resources at the organization level by adding a resource filter within `fides_meta`. The `ignore_resource_arn` filter can exclude any resources with an exact matching Amazon Resource Name (ARN), and also supports wildcards in individual ARN fields. An empty ARN field in the filter pattern works as a wildcard.

The filter can be added to the organization model within your manifest file:
```yaml
organization:
- fides_key: default_organization
  name: default_organization
  fidesctl_meta:
    resource_filters:
    - type: ignore_resource_arn
      value: 'arn:aws:rds:us-east-1:910934740016:db:database-2'
```

In the above example, Fides explicitly ignores a single RDS database. To ignore all RDS databases, remove the partition, account ID, region and database name ARN fields:
```yaml
resource_filters:
- type: ignore_resource_arn
  value: 'arn::rds:::db:'
```

Any ARN field can be referenced as a wildcard by leaving it empty.

### Generate systems

Once credentials have been configured, the `generate system aws` command will connect automatically:
```sh
./venv/bin/fides generate system aws \
  fides_resources/aws_systems.yml
```

The result is a resource file with a system that represents a data source in your account:
```yaml
system:
- fides_key: my_redshift_cluster
  organization_fides_key: default_organization
  name: my_redshift_cluster
  description: 'Fides Generated Description for Cluster: my_redshift_cluster'
  fidesctl_meta:
    endpoint_address: my_redshift_cluster.us-east-1.redshift.amazonaws.com
    endpoint_port: '5439'
    resource_id: arn:aws:redshift:us-east-1:910934740016:namespace:057d5b0e-7eaa-4012-909c-3957c7149176
  system_type: redshift_cluster
  privacy_declarations: []
```
#### Scanning systems

The `scan` command can then connect to your AWS account and compare its resources to your already defined systems:
```sh
./venv/bin/fides scan system aws \
  fides_resources/aws_systems.yml
```

The command output confirms our resources are covered fully:
```sh
Loading resource manifests from: manifest.yml
Taxonomy successfully created.
Scanned 1 resource and all were found in taxonomy.
Resource coverage: 100%
```

## Scan an Okta account
The `generate` command can connect to an Okta administration account and automatically generate resource YAML files based on your integrated applications.

<Callout>To learn how Fides can scan your infrastructure using the UI, check out the [data map guides](../data_mapping/scanners).</Callout>

### Providing credentials
Okta credentials can be provided through command options, environment variables or the Fides config.

#### Command line
Credentials can be directly supplied in your command using the `org-url` and `token` options.

```sh
fides generate system okta \
--token "<my_okta_client_token>"
--org-url "<my_okta_org_url>"
...
```

#### Environment variables
To authenticate by using a client token, defined by the [Okta Python SDK](https://github.com/okta/okta-sdk-python#environment-variables), 
```sh
export OKTA_CLIENT_TOKEN="<my_okta_client_token>"
```

It is also possible to authenticate using OAuth 2.0:
```sh
export OKTA_CLIENT_AUTHORIZATIONMODE="PrivateKey"
export OKTA_CLIENT_CLIENTID="<my_client_id>"
export OKTA_CLIENT_SCOPES="<my_scope_1,my_scope_2>"
export OKTA_CLIENT_PRIVATEKEY="<my_private_jwk>"
```

#### Configuration files
Credentials can be defined within your [Fides config](../get_started/configuration) under the credentials section.

```sh
[credentials]
my_okta_credentials = {orgUrl="<my_okta_org_url>" token="<my_okta_client_token>"}
```

Your command can then reference the key defined in your config.
```sh
...
--credentials-id "my_okta_credentials"
...
```

If persisting your token to a file is problematic, it is possible to use an environment variable to set credentials config values. To use a token, you can set the environment variable with a prefix of `FIDES__CREDENTIALS__` and `__` as the nested key delimiter:
```sh
export FIDES__CREDENTIALS__MY_OKTA_CREDENTIALS__TOKEN="<my_okta_client_token>"
```

### Generate systems

Once credentials have been configured, the `generate system okta` command will connect automatically:
```sh
./venv/bin/fides generate system okta
  fides_resources/okta_systems.yml
```

The result is a resource file containing systems that represent your application integrations:
```yaml
system:
- fides_key: 0oa4jejqcp74R9MpJ5d7
  organization_fides_key: default_organization
  name: salesforce
  description: 'Fides Generated Description for Okta Application: Salesforce.com'
  fidesctl_meta:
    resource_id: 0oa4jejqcp74R9MpJ5d7
  privacy_declarations: []
- fides_key: 0oa4jekd00tpvn5hN5d7
  organization_fides_key: default_organization
  name: google
  description: 'Fides Generated Description for Okta Application: Google Workspace'
  fidesctl_meta:
    resource_id: 0oa4jekd00tpvn5hN5d7
  privacy_declarations: []
```

### Scan the systems

The `scan` command can then connect to your Okta account and compare its applications to your already defined systems:
```sh
./venv/bin/fides scan system okta \
  fides_resources/okta_systems.yml
```

The command output confirms our resources are covered fully:
```sh
Loading resource manifests from: manifest.yml
Taxonomy successfully created.
Successfully scanned the following systems:
	saasure(id=0oa4h45lj1tcpqU6W5d7)
	okta_enduser(id=0oa4h45ln0xLKJnAw5d7)
	okta_browser_plugin(id=0oa4h45lnodX7MHJB5d7)
	salesforce(id=0oa4jejqcp74R9MpJ5d7)
	google(id=0oa4jekd00tpvn5hN5d7)

Resource coverage: 100%
```