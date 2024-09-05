#!/bin/bash

# USAGE: 
# ./docker.sh [all | frontend | bouvet-cv-service | employee-service | customer-service | project-service | aggregator | kong | ruleengine | notification-service]
# example:
# ./docker.sh all
# ./docker.sh frontend
# ./docker.sh frontend aggregator 

# Define associative array of containers with simple keys
declare -A containers=(
    ["frontend"]="bike-repair-shop-frontend:bike-repair-shop-frontend"
    ["api"]="bike-repair-shop-api:bike-repair-shop-api"
    # ["db"]="dp:dp"
)

# Function to delete a container
delete_container() {
    container_name=$1
    image_name=$2

    # Stop, remove the container, and force remove the image
    docker stop "$container_name"
    docker rm "$container_name"
    docker rmi -f "$image_name"
}

# Process command-line arguments
for arg in "$@"
do
    if [[ "$arg" == "all" ]]; then
        # If argument is "all", delete all containers
        for key in "${!containers[@]}"; do
            IFS=':' read -r container_name image_name <<< "${containers[$key]}"
            delete_container "$container_name" "$image_name"
        done
    elif [[ -n ${containers[$arg]+x} ]]; then
        # If argument matches a simple name, delete the corresponding container 
        IFS=':' read -r container_name image_name <<< "${containers[$arg]}"
        delete_container "$container_name" "$image_name"
    else
        echo "Unknown command: $arg"
    fi
done

# Start Docker Compose services
COMPOSE_PROFILES=database KONG_DATABASE=postgres docker-compose up -d

