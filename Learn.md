## Docker

**The fastest way to create a Dockerfile - to generate it with IDE**

To build it, run:

```
docker build -f Dockerfile -t image_name
```

To start/stop a docker container

```
docker start/stop image_name
```

To run it:

```
docker run -it --rm -p 5000:8080 --name container_name image_name
```

where:

- `-i` stands for `interactive`, which means that th behaviour is the similar to normal terminal
- `-t` is `tty` means, that the normal terminal will be connected with STDIN and ERRIN channels with docker
- `--rm` - when u stop the container, it will be automatically removed
- `-p 5000:8080` - port matching, where `5000` is external port, which is accessible from your browser, and `8080` is inner docker port
- `--name container_name` - creates a container with this name

To open container's terminal:

```
docker exec container_id_or_name /bin/sh
```

To watch containers' settings:

```
docker inspect container_id_or_name
```

---

### Network

**If you wish your containers interact with each other, they need to work in the same network**

To create docker network:

```
docker create network -d bridge network_name
```

After all of the container need to be connected to the network using parameter `--network network_name`

Connected are accessible within the same network as `http://{container_name}:{internal_docker_port}`

---

### Docker Compose

**The fastest way to develop is to use `docker compose watch`, but it requres some additional settings in `compose.yaml`**

To build images and run, write:
`docker compose up --bbuild`

## Containerize .NET

List of common rules and mistakes:

1. Name of `.dll` file is not always the same as `.csproj` or `.fsproj`. Especially, when you have renamed it, natural name will be written in project file at `<AssemblyName>` tag
2. If you wish to setup `docker compose watch` the onlt `action` works for you is `rebuild`

## Containerize Angular

1. Default Dockerfiles on the internet are good enough and working.
2. Angular and other web containers work with localhost, external port, while .NET microservices work on internal Docker network

## .NET Aspire - tool for discovery services

default tempalte `aspire-starter` creates the solution of 4 projects:

- **`ApiService`** - a simple weather API
- **`AppHost`** - key unit
- **`Web`** - default Blazor counter and Weather API fetcher
- **`ServiceDefaults`** - contains default methods to simplify work like:
  - `AddServiceDefaults` - adds everything below
  - `ConfigureOpenTelemetry`
  - `AddOpenTelemetryExporters`
  - `AddDefaultHealthChecks`
  - `MapDefaultEndpoints` - maps endpoints for healthchecker

### AppHost - key unit

Unions all of the service:

```cs
var apiService = builder.AddProject<Projects.AspireDiscovery_ApiService>("apiservice");

builder.AddProject<Projects.AspireDiscovery_Web>("webfrontend")
    .WithExternalHttpEndpoints()
    .WithReference(cache)
    .WaitFor(cache)
    .WithReference(apiService)
    .WaitFor(apiService);
```

### Aspire Roadmap

- **Orchestrate Node.js apps**: https://learn.microsoft.com/en-us/dotnet/aspire/get-started/build-aspire-apps-with-nodejs

- Add **Dockerfile** to your system to make to possible to build them while starting **AppHost**: https://learn.microsoft.com/en-us/dotnet/aspire/app-host/withdockerfile

- Persist .NET Aspire data with volumes: https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/persist-data-volumes

- .NET Aspire Deployment: https://learn.microsoft.com/en-us/dotnet/aspire/deployment/overview
