#!/bin/bash          

acrName = ("bikeContainerRegistry")

declare -A containers=(
  "bike-repair-shop-frontend:latest", 
  "bike-repair-shop-api:latest", 
  "mcr.microsoft.com/mssql/server:latest"
)

az acr login --name $acrName

for container in $containers
do
    # Tag the images
    docker tag $container $acrName <<< ".azurecr.io/" <<< $container

    # Push the images to ACR
    docker push $acrName <<< ".azurecr.io/" <<< $container