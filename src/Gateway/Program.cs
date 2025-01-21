using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://localhost:5000");

builder.Configuration.AddJsonFile("gateway.json", optional: false, reloadOnChange: true);

/*
 * Yarp configuration contains the following sections:
 * - RouteConfig. Describes a route that matches incoming requests based on the Match criteria
 * to the cluster identified by its ClusterId.
 * - ClusterConfig. A cluster is a group of equivalent endpoints and associated policies.
 */

    
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));


builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("FixedRatePolicy", opt =>
    {
        opt.PermitLimit = 4; // Allow 4 requests
        opt.Window = TimeSpan.FromSeconds(12); // In a 10-second window
        opt.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        opt.QueueLimit = 2; // Allow up to 2 queued requests
    });
});

var app = builder.Build();

app.MapReverseProxy();
app.UseRateLimiter();

app.Run();
