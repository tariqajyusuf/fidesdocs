import Callout from 'nextra-theme-docs/callout'

# Scan Databases with the CLI 
## Overview 
Fides ships with several CLI-based scanners to connect to your databases, services, or applications, and create Fides-compatible resource templates for use in your [CI/CD pipelines](./cicd) and [data maps](./generate_datamaps). 

The Fides CLI provides a `generate` command to connect to a database or service, and automatically generate a [YAML-based resource file](../dsr_quickstart/dsr_support/datasets) based on the database schema. The `scan` command is available to compare your existing resources against what is defined in your Fides server, or against your resource manifest files, to ensure any updates remain compliant. These commands are available for a variety of [databases](#scan-databases) and [services](./infra_scanning).

The `scan` and `generate` commands work best when used in tandem. The Fides format must be followed to ensure coverage.

## Scan databases 
Fides works out-of-the-box with most databases, including:

* PostgreSQL
* MySQL and MariaDB
* SQLite
* Oracle
* Microsoft SQL Server

 For a list of supported options, see the available [SQLAlchemy dialects](https://docs.sqlalchemy.org/en/14/dialects/index.html#external-dialects).

Additionally, Fides includes commands to connect to [BigQuery](#scan-a-google-cloud-platform-account) and [Snowflake](https://docs.snowflake.com/en/user-guide/sqlalchemy.html#connection-string-examples) data warehouses. 

### Provide connection credentials
Database credentials are provided as part of the connection string supplied. The connection string can be supplied as a command option, or using the Fides [configuration](../get_started/configuration). The appropriate `connection-string` format for your database connector can be found in the [SQLAlchemy Documentation](https://docs.sqlalchemy.org/en/14/dialects/).

#### Command line
A connection string can be supplied using the `connection-string` option:
```sh
fides generate dataset db \
--connection-string <my_connection_string>
```

#### Configuration files
A connection string can also be defined within your Fides [configuration](../get_started/configuration) under the `credentials` section.

```sh
[credentials]
my_database_credentials = {connection_string="<my_connection_string>"}
```

Your command can then reference the key defined in your config:
```sh
...
--credentials-id "my_database_credentials"
...
```

#### Environment variables
It is possible to use an environment variable to set credentials config values if persisting your connection string to a file is problematic. To set a connection string you can set the environment variable with a prefix of `FIDES__CREDENTIALS__` and `__` as the nested key delimiter:
```sh
export FIDES__CREDENTIALS__MY_DATABASE_CREDENTIALS__CONNECTION_STRING="<my_database_credentials>"
```

### Example

The following example will generate a new [dataset](../dsr_quickstart/dsr_support/datasets) from the below database schema:

```shell
 id |     created_at      |       email       |              password              | first_name | last_name
----+---------------------+-------------------+------------------------------------+------------+-----------
  1 | 2020-01-01 00:00:00 | admin@example.com | pbkdf2:sha256:260000$O87nanbSkl... | Admin      | User
  2 | 2020-01-03 00:00:00 | user@example.com  | pbkdf2:sha256:260000$PGcBy5NzZe... | Example    | User
```

Invoke the `generate` command by providing a connection url for this database:
```sh
./venv/bin/fides generate dataset db \
  fides_resources/flaskr_postgres_dataset.yml \
  --connection-string postgresql://postgres:postgres@localhost:5432/flaskr
```

The second line represents an output file location. In this case, the generated dataset will be placed in the `/fides_resources/` directory, as a file named `flaskr_postgres_dataset.yml`.

The result is a resource file with a dataset with collections and fields to represent the above schema:
```yaml
dataset:
- fides_key: public
  organization_fides_key: default_organization
  name: public
  description: 'Fides Generated Description for Schema: public'
  meta: null
  data_categories: []
  data_qualifier: aggregated.anonymized.unlinked_pseudonymized.pseudonymized.identified
  collections:
  - name: public.users
    description: 'Fides Generated Description for Table: public.users'
    data_categories: []
    data_qualifier: aggregated.anonymized.unlinked_pseudonymized.pseudonymized.identified
    fields:
    - name: created_at
      description: 'Fides Generated Description for Column: created_at'
      data_categories: []
      data_qualifier: aggregated.anonymized.unlinked_pseudonymized.pseudonymized.identified
    - name: email
      description: 'Fides Generated Description for Column: email'
      data_categories: []
      data_qualifier: aggregated.anonymized.unlinked_pseudonymized.pseudonymized.identified
    - name: first_name
      description: 'Fides Generated Description for Column: first_name'
      data_categories: []
      data_qualifier: aggregated.anonymized.unlinked_pseudonymized.pseudonymized.identified
    - name: id
      description: 'Fides Generated Description for Column: id'
      data_categories: []
      data_qualifier: aggregated.anonymized.unlinked_pseudonymized.pseudonymized.identified
    - name: last_name
      description: 'Fides Generated Description for Column: last_name'
      data_categories: []
      data_qualifier: aggregated.anonymized.unlinked_pseudonymized.pseudonymized.identified
    - name: password
      description: 'Fides Generated Description for Column: password'
      data_categories: []
      data_qualifier: aggregated.anonymized.unlinked_pseudonymized.pseudonymized.identified
```

From here, the `data_categories` can be edited to include the types of data stored by each field. For information on how Fides can do this automatically, see the Fides [data classifier](../../enterprise/classifier).

<Callout> **To use this Dataset in a Privacy Request,** you must add required [meta information](../dsr_quickstart/dsr_support/datasets). </Callout>

### Scan the dataset

The `scan` command can then connect to your database and compare its schema to your defined datasets, helping you track changes between your live tables and your stored resources.

```sh
./venv/bin/fides scan dataset db \
  fides_resources/flaskr_postgres_dataset.yml \
  --connection-string postgresql://postgres:postgres@localhost:5432/flaskr
```

The command output confirms our database resource is covered fully:
```sh
Loading resource manifests from: dataset.yml
Taxonomy successfully created.
Successfully scanned the following datasets:
	public

Annotation coverage: 100%
```

## Scan a Google Cloud Platform account

The `generate` command can connect to a GCP account and automatically generate resource files based on the contents. Currently, generating datasets from BigQuery is supported.

### Providing Credentials

GCP credentials can be generated via a [service account keyfile](https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating) which can be passed as a command option or via Fides [configuration](../get_started/configuration). You will need to set project specific credentials for access rights, but datasets can be passed explicitly at runtime.

#### Command line

The path to the keyfile can be directly supplied in your command using the `keyfile_path` option.
```sh
...
--keyfile-path "/path/to/keyfile.json"
...
```

#### Configuration files
Credentials can be defined within your [Fides config](../get_started/configuration) under the credentials section.

```toml
[credentials.bigquery_1]
type = "service_account"
project_id = "<my_project_id>"
private_key_id = "<my_private_key_id>"
private_key = "<my_private_key>"
client_email = "<my_client_email>"
client_id = "<my_client_id>"
auth_uri = "https://accounts.google.com/o/oauth2/auth"
token_uri = "https://oauth2.googleapis.com/token"
auth_provider_x509_cert_url = "https://www.googleapis.com/oauth2/v1/certs"
client_x509_cert_url = "<my_cert_url>"
```

Your command can then reference the key defined in your config.
```sh
...
--credentials-id "my_gcp_credentials"
...
```

If persisting your keys to a config file is problematic, it is possible to use an environment variable to set credentials config values. To set a secret access key and id, you can set the environment variable with a prefix of `FIDES__CREDENTIALS__` and `__` as the nested key delimiter:
```sh
export FIDES__CREDENTIALS__BIGQUERY_1__PRIVATE_KEY="<my_private_key>"
export FIDES__CREDENTIALS__BIGQUERY_1__CLIENT_ID="<my_client_id>"
```

### Generate a Dataset

Once credentials have been configured, the `generate dataset gcp bigquery` command can take both a configuration option and a dataset name to create the resource file:

```sh
./venv/bin/fides generate dataset gcp bigquery \
  <dataset_name> --keyfile-path ".fides/creds/bigquery.json" \
  <output_file_name>
```

The result is a resource file with a dataset that represents the bigquery dataset defined in your account.

```yaml
dataset:
- fides_key: my_bigquery_dataset
  organization_fides_key: default_organization
  name: bigquery dataset
  description: 'Fides Generated Description for Schema: BigQuery'
  data_categories: []
  data_qualifier: aggregated.anonymized.unlinked_pseudonymized.pseudonymized.identified
  retention: No retention or erasure policy
  collections:
  - name: table
    description: 'Fides Generated Description for Table: table'
    data_categories: []
    data_qualifier: aggregated.anonymized.unlinked_pseudonymized.pseudonymized.identified
    fields:
    - name: column
      description: 'Fides Generated Description for Column: column'
      data_categories: []
      data_qualifier: aggregated.anonymized.unlinked_pseudonymized.pseudonymized.identified
...
```
