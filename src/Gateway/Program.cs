var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("gateway.json", optional: false, reloadOnChange: true);

/*
 * Yarp configuration contains the following sections:
 * - RouteConfig. Describes a route that matches incoming requests based on the Match criteria
 * to the cluster identified by its ClusterId.
 * - ClusterConfig. A cluster is a group of equivalent endpoints and associated policies.
 */

    
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

var app = builder.Build();

app.MapGet("/", () => "Hello from Gateway!");

app.MapReverseProxy();
app.Run();
