FROM mcr.microsoft.com/dotnet/sdk:8.0 as build
WORKDIR /App


# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release

# dotnet publish compiles app and its dependencies into self-contained directory
# and ensures optimal output for deployment purpose

# -o out specifies the output directory
RUN dotnet publish -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /App

ENV ASPNETCORE_URLS=http://localhost:5001
EXPOSE 5001

COPY --from=build /App/out .
ENTRYPOINT ["dotnet", "EarthquakesMicroservice.dll"]