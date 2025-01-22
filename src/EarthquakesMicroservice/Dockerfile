FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8001

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/EarthquakesMicroservice/EarthquakesMicroservice.fsproj", "./"]
RUN dotnet restore "EarthquakesMicroservice.fsproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "src/EarthquakesMicroservice/EarthquakesMicroservice.fsproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "src/EarthquakesMicroservice/EarthquakesMicroservice.fsproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EarthquakesMicroservice.dll"]
