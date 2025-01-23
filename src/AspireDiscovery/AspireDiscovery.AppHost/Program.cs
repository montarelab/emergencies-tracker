var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedis("cache");

var apiService = builder.AddProject<Projects.AspireDiscovery_ApiService>("apiservice");

builder.AddProject<Projects.Gateway>("gateway");
builder.AddProject<Projects.EarthquakesMicroservice>("volcanoes");
builder.AddProject<Projects.VolcanoesMicroservice>("earthquakes");
// builder.AddProject<Projects.VolcanoesMicroservice>("angular_frontend");

builder.AddProject<Projects.AspireDiscovery_Web>("webfrontend")
    .WithExternalHttpEndpoints()
    .WithReference(cache)
    .WaitFor(cache)
    .WithReference(apiService)
    .WaitFor(apiService);

builder.Build().Run();
