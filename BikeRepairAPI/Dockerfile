# Stage 1: Build the API
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

COPY . .

RUN dotnet publish -c Release -o out

# Stage 2: Run the API
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app

EXPOSE 5275

COPY --from=build /app/out ./

ENTRYPOINT ["dotnet", "BikeRepairAPI.dll"]
