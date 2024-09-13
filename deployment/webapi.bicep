// @description('The name of the Resource Group')
// param resourceGroupName string = 'BikeRepair-OleAnders'

@description('The name of the Azure Web App')
param webAppName string = 'bikeapi'

@description('The name of the App Service Plan')
param servicePlanName string = 'bike-repair-plan'

@description('The location of the resources')
param location string = resourceGroup().location

@description('The name of the Azure Container Registry (ACR)')
param acrName string = 'bikecontainerregistry'  // Only the registry name, not the full URL

@description('The name of the container image in ACR')
param containerImageName string = 'bike-repair-shop-api'

@description('The tag for the container image')
param containerImageTag string = 'latest'

@description('The SKU for the App Service Plan (e.g., B1, P1v2)')
param sku string = 'B1'

resource acr 'Microsoft.ContainerRegistry/registries@2022-12-01' existing = {
  name: acrName
}

resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: servicePlanName
  location: location
  sku: {
    name: sku
    tier: 'Basic'
    size: 'B1'
    capacity: 1
  }
  kind: 'linux'
  properties: {
    reserved: true  // Linux
  }
}

resource webApp 'Microsoft.Web/sites@2022-03-01' = {
  name: webAppName
  location: location
  kind: 'app,linux'
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      appSettings: [
        {
          name: 'DOCKER_REGISTRY_SERVER_URL'
          value: 'https://${acrName}'
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_USERNAME'
          value: listCredentials(acr.id, '2019-05-01').username
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_PASSWORD'
          value: listCredentials(acr.id, '2019-05-01').passwords[0].value
        }
        {
          name: 'WEBSITES_ENABLE_APP_SERVICE_STORAGE'
          value: 'false'
        }
        {
          name: 'WEBSITES_PORT'
          value: '80'  // If your app exposes a different port, change this
        }
      ]
      linuxFxVersion: 'DOCKER|${acrName}/${containerImageName}:${containerImageTag}'
    }
  }
}


output webAppUrl string = webApp.properties.defaultHostName
