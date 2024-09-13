# How to set up the project in Azure

## Prerequisites
You need to have azure CLI installed to run this. [information about installation](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)

## login
```bash
cd .\deployment\
az login
```

## create a container registry

```bash
az deployment group create
     --resource-group BikeRepair-OleAnders
     --template-file ./container-registry.bicep
     --parameters acrName=bikecontainerregistry acrSku=Basic
```
## Add docker images to the registry
```bash
./pushImage.sh
```

## Set up database
* Set up a SQL database whit this criterial [this](https://learn.microsoft.com/en-us/azure/azure-sql/database/azure-sql-dotnet-entity-framework-core-quickstart?view=azuresql&tabs=dotnet-cli%2Cservice-connector%2Cportal) mal
    * Server Name: bikedbserver
    * Database Name: BikeRepairDb
* run from main path:
```bash
cd '\efBike\
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## Spin up frontend docker container
```bash
az deployment group create
  --resource-group BikeRepair-OleAnders
  --template-file container-instance.bicep
```

## spin up Web api:
* 



## Nice code snippets
Getting the user name and password for admin in the acr
```bash
az acr credential show --name <yourACRName>
```