# Create Datasets

The Datasets panel allows you to easily view, add, edit, and configure _[datasets](https://ethyca.github.io/fideslang/resources/dataset/)_, which represent the information contained by databases and other systems. While Fides can create an internal dataset for standardized [SaaS connections](../saas_connectors/saas_config), your owned databases - and their custom schema - need to be scanned and annotated for personally identifiable information (PII).

## Adding a dataset 

Datasets can be added to the Fides UI by connecting to your owned databases, which will automatically generate a dataset of the contained tables. To add a new dataset, select **Create new dataset** from the Datasets panel.

![Dataset UI](../../../public/assets/img/dsr_quickstart/datasets.png)

You will then be given a list of options for creating your new dataset:

![Add A Dataset](../../../public/assets/img/dsr_quickstart/new_dataset.png)

### Connect to a database 

To generate a dataset by connecting directly to a database, select **Connect a database using a connection URL**.

![Add A Connection](../../../public/assets/img/dsr_quickstart/add_database.png)

You will need to provide your **database type** from the dropdown, as well as the **database URL string.** 

Once the required information is entered, select **Create database**. Fides will display a success notification when the process is completed.

## Next steps
With your databases connected and your SaaS applications configured, you're ready to [process a DSR](./dsr_processing)!