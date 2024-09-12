#!/bin/bash          

arcName="bikecontainerregistry"

containers=(
  "bike-repair-shop-frontend:latest"
  "bike-repair-shop-api:latest"
  "mcr.microsoft.com/mssql/server:latest"
)

echo "Logging in to ACR $arcName..."
az acr login --name $arcName

for container in "${containers[@]}"
do
    echo "Tagging Docker images..."
    docker tag "$container" "$arcName.azurecr.io/$container"
    echo "Pushing images to ACR..."
    docker push "$arcName.azurecr.io/$container"
done

echo "Finish pusshing Docker images"