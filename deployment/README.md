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
az deployment group create --resource-group BikeRepair-OleAnders --template-file ./container-registry.bicep --parameters acrName=bikecontainerregistry acrSku=Basic
```
## Add docker images to the registry
```bash
./pushImage.sh
```

## Set up database (UI)
* Set up a SQL database whit this criterial [this](https://learn.microsoft.com/en-us/azure/azure-sql/database/azure-sql-dotnet-entity-framework-core-quickstart?view=azuresql&tabs=dotnet-cli%2Cservice-connector%2Cportal) mal
  * Server 
    * Name: bikedbserver
    * Use Microsoft Entra-only authentication
    * Set Admin (You)
  * Database 
    * Name: BikeRepairDb
    * Networking
      * Connectivity method: public endpoint
      * Allow Azure services and resources to access this server: Yes

In the UI go tho the networking tab for the SQL server and add your client ipv4 address. Then you can run this from the root directory:
```bash
cd ./efBike/
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## Spin up frontend docker container
```bash
az deployment group create --resource-group BikeRepair-OleAnders --template-file container-instance.bicep
```

## spin up Web api (UI):
* use: Web App
* name: bikeapi
* publish: Container
* Operation System: Linux
* Container (Page)
  * Image Source: Azure Container Registry
  * Image: bike-repair-shop-api 

## spin up Web api (CLI/bicep):
```bash
az deployment group create  --resource-group BikeRepair-OleAnders  --template-file webapi.bicep  --parameters acrName='bikecontainerregistry' containerImageTag='latest'
```

## Nice code snippets
Getting the user name and password for admin in the acr
```bash
az acr credential show --name <yourACRName>
```