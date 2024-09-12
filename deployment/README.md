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
az deployment group create   --resource-group BikeRepair-OleAnders  --template-file ./container-registry.bicep  --parameters acrName=bikecontainerregistry acrSku=Basic 
```
## Add docker images to the registry
```bash
./pushImage.sh
```
