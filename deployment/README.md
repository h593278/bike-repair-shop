# How to set up the project in Azure

## Prerequisites
You need to have azure CLI installed to run this. [information about installation](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)

## login
<code>
    az login
</code>

## create a container registry
<code>
     az deployment group create   --resource-group BikeRepair-OleAnders  --template-file ./container-registry.bicep  --parameters acrName=bikeContainerRegistry acrSku=Basic 
</code>

## Add docker images to the registry
<code>
     ./pushImage.sh
</code>

