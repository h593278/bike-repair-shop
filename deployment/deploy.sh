#!/bin/bash          


acrName="bikecontainerregistry"
resourceGroup="BikeRepair-OleAnders"
#log in
az login

#Rebuild images
# ../docker.sh all

# Create container registry
echo "Create container registry..."
az deployment group create --resource-group $resourceGroup --template-file ./container-registry.bicep --parameters acrName=$acrName acrSku=Basic

echo "Loging into the registry..."
az acr login --name $acrName

echo "add docker image to the registry..."
./pushImage.sh

#Is DB needed here?

#Frontend
echo "Create Frontend..."
az deployment group create --resource-group $resourceGroup --template-file container-instance.bicep

#Backend
echo "Create API..."
az deployment group create  --resource-group $resourceGroup  --template-file webapi.bicep  --parameters acrName=$acrName containerImageTag='latest'