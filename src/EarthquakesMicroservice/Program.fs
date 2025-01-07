module EarthquakesMicroservice.Program

open System
open EarthquakesMicroservice.Dependencies
open Microsoft.AspNetCore
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Cors.Infrastructure
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.DependencyInjection
open Giraffe
open EarthquakesMicroservice.Api.Endpoints
open Microsoft.Extensions.Logging

let errorHandler (ex : Exception) (logger : ILogger) =
    logger.LogError(ex, "An unhandled exception has occurred while executing the request.")
    clearResponse >=> setStatusCode 500 >=> text ex.Message

let configureCors (builder : CorsPolicyBuilder) =
    builder.WithOrigins(
            "http://localhost:5000",
            "https://localhost:5001")
        .AllowAnyMethod()
       .AllowAnyHeader()
       |> ignore


let configureServices (services: IServiceCollection) =
    services.AddCors() |> ignore
    services.AddGiraffe() |> ignore

let configureLogging (builder : ILoggingBuilder) =
    builder.AddConsole()
           .AddDebug() |> ignore

let webApp fetchList fetchOne predict =
    choose [
        route "/earthquakes/list" >=> getEarthquakeList fetchList
        routef "/earthquakes/%s" (fun id -> getEarthquakeById (fun () -> fetchOne id))
        route "/earthquakes/predict" >=> predictEarthquakes predict
    ] 

let configureApp (app: IApplicationBuilder) =
    let httpClientWrapper = configureDependencies()
    let fetchList () = httpClientWrapper.GetEarthquakesListAsync()
    let fetchOne id = httpClientWrapper.GetEarthquakeAsyncById(id)
    let predict () = task { return "Prediction data" }
    
    // todo how http handlers work 
    app.UseGiraffeErrorHandler(errorHandler)
       .UseHttpsRedirection()
       .UseCors(configureCors)
       .UseGiraffe(webApp fetchList fetchOne predict)
       

[<EntryPoint>]
let main args =
    let builder = WebHost.CreateDefaultBuilder(args)
                      .ConfigureServices(configureServices)
                      .ConfigureLogging(configureLogging)
                      .Configure(configureApp)
                      .Build()
                      
    builder.Run()
    0