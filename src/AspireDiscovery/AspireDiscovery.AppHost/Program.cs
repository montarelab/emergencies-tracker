var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedis("cache");

var apiService = builder.AddProject<Projects.AspireDiscovery_ApiService>("apiservice");

builder.AddContainer("gateway", "trackemergencies-gateway")
       .WithEnvironment("LOG_LEVEL", "DEBUG")
    //    .WithExternalHttpEndpoints(8000)
       .WithHttpEndpoint(targetPort: 5000);

builder.AddContainer("earthquakes", "trackemergencies-earthquakes")
       .WithEnvironment("LOG_LEVEL", "DEBUG")
    //    .WithExternalHttpEndpoints(8001)
       .WithHttpEndpoint(targetPort: 5001);

builder.AddContainer("volcanoes", "trackemergencies-volcanoes")
       .WithEnvironment("LOG_LEVEL", "DEBUG")
    //    .WithExternalHttpEndpoints(8002)
       .WithHttpEndpoint(targetPort: 5002);

builder.AddContainer("frontend", "trackemergencies-frontend")
    //    .WithExternalHttpEndpoints(4200)
       .WithHttpEndpoint(targetPort: 4200);


// builder.AddProject<Projects.Gateway>("gateway");
// builder.AddProject<Projects.EarthquakesMicroservice>("volcanoes");
// builder.AddProject<Projects.VolcanoesMicroservice>("earthquakes");
// builder.AddProject<Projects.VolcanoesMicroservice>("angular_frontend");

// builder.AddProject<Projects.AspireDiscovery_Web>("webfrontend")
//     .WithExternalHttpEndpoints()
//     .WithReference(cache)
//     .WaitFor(cache)
//     .WithReference(apiService)
//     .WaitFor(apiService);

builder.Build().Run();
