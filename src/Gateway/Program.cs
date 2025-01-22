using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.RateLimiting;
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

app.MapGet("/hello" , () => "Hello World!");

app.MapReverseProxy(proxyPipeline =>
{
    proxyPipeline.Use(async (context, next) =>
    {
        await next();
        var errorFeature = context.GetForwarderErrorFeature();
        if (errorFeature is not null)
        {
            if(errorFeature.Exception is UriFormatException ex)
            {
                context.Response.StatusCode = StatusCodes.Status502BadGateway;
                string message = $"The hostname could not be parsed: {context.Request.GetDisplayUrl()}.";
                await context.Response.WriteAsync(message);            
            }
        }
    });
});
app.UseRateLimiter();

app.MapFallback(async context =>
{
    context.Response.ContentType = "application/json";
    context.Response.StatusCode = 404;
    var errorResponse = new
    {
        StatusCode = 404,
        Message = "The requested URL was not found on the server."
    };
    await context.Response.WriteAsJsonAsync(errorResponse);
});


app.Run();
