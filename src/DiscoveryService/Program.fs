module VolcanoesMicroservice.Program

open System
open VolcanoesMicroservice.Api
open VolcanoesMicroservice.Services.VolcanoesService
open VolcanoesMicroservice.Dependencies
open Microsoft.AspNetCore
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Cors.Infrastructure
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.DependencyInjection
open Giraffe
open VolcanoesMicroservice.Api.Endpoints
open Microsoft.Extensions.Logging

let errorHandler (ex : Exception) (logger : ILogger) =
    logger.LogError(ex, "An unhandled exception has occurred while executing the request.")
    clearResponse >=> setStatusCode 500 >=> text ex.Message

let configureCors (builder : CorsPolicyBuilder) =
    builder.WithOrigins(
            "http://localhost:4200",
            "https://localhost:4200")
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
        route "/volcanoes/list" >=> getVolcanoesList fetchList
        routef "/volcanoes/%s" (fun id -> getVolcanoById (fun () -> fetchOne id))
        route "/volcanoes/predict" >=> predictVolcanoes predict
    ] 

let configureApp (app: IApplicationBuilder) =
    let httpClientWrapper = configureDependencies()
    let volcanoesService = new VolcanoesService(httpClientWrapper)
    let fetchList () = volcanoesService.GetVolcanoesListAsync()
    let fetchOne id = volcanoesService.GetVolcanoByIdAsync(id)
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