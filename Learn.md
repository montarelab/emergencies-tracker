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
