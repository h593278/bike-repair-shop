param location string = resourceGroup().location
param acrName string = 'bikecontainerregistry'  // Your ACR name
param acrLoginServer string = '${acrName}.azurecr.io'

resource acr 'Microsoft.ContainerRegistry/registries@2021-09-01' existing = {
  name: acrName
}

@description('Bike Repair Shop Frontend Container')
resource frontendContainerInstance 'Microsoft.ContainerInstance/containerGroups@2021-09-01' = {
  name: 'bike-repair-shop-frontend'
  location: location
  properties: {
    containers: [
      {
        name: 'frontend'
        properties: {
          image: '${acrLoginServer}/bike-repair-shop-frontend:latest'
          resources: {
            requests: {
              cpu: 1
              memoryInGB: 2
            }
          }
          ports: [
            {
              port: 80
            }
          ]
        }
      }
    ]
    osType: 'Linux'
    ipAddress: {
      type: 'Public' 
      dnsNameLabel: 'bikerepair'
      ports: [
        {
          protocol: 'TCP'
          port: 80
        }
      ]
    }
    imageRegistryCredentials: [
      {
        server: acr.properties.loginServer
        username: acrName
        password: listCredentials(acr.id, '2021-09-01').passwords[0].value
      }
    ]
  }
}
