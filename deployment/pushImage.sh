#!/bin/bash          

acrName="bikecontainerregistry"

containers=(
  "bike-repair-shop-frontend:latest"
  "bike-repair-shop-api:latest"
)

echo "Logging in to ACR $acrName..."
az acr login --name $acrName

for container in "${containers[@]}"
do
    echo "Tagging Docker images..."
    docker tag "$container" "$acrName.azurecr.io/$container"
    echo "Pushing images to ACR..."
    docker push "$acrName.azurecr.io/$container"
done

echo "Finish pusshing Docker images"