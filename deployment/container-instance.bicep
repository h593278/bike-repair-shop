@description('The location of the resources')
param location string = resourceGroup().location

@description('The name of the Azure Container Registry')
param acrName string = 'bike-repair-shop-frontend'

@description('The image to use from the Azure Container Registry')
param imageName string = 'dbcontainer'

@description('The DNS name label for the container instance')
param dnsNameLabel string = 'bikerepair'

@description('The port(s) to expose from the container')
param ports array = [
  80
  5173
]

@description('The number of CPU cores to allocate to the container.')
param cpuCores int = 1

@description('The amount of memory to allocate to the container in gigabytes.')
param memoryInGb int = 2

resource containerGroup 'Microsoft.ContainerInstance/containerGroups@2023-05-01' = {
  name: 'myContainerInstance'
  location: location
  properties: {
    containers: [
      {
        name: imageName
        properties: {
          image: '${acrName}.azurecr.io/${imageName}:latest'
          ports: [
            for port in ports: {
              port: port
              protocol: 'TCP'
            }
          ]
          resources: {
            requests: {
              cpu: cpuCores
              memoryInGB: memoryInGb
            }
          }
        }
      }
    ]
    osType: 'Linux'
    ipAddress: {
      type: 'Public'
      dnsNameLabel: dnsNameLabel
      ports: [
        for port in ports: {
          port: port
          protocol: 'TCP'
        }
      ]
    }
    imageRegistryCredentials: [
      {
        server: '${acrName}.azurecr.io'
        username: ''
        password: ''
      }
    ]
  }
}
