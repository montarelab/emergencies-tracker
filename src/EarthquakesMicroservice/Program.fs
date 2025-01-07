module EarthquakesMicroservice.Program

open Microsoft.AspNetCore
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.DependencyInjection
open Giraffe
open EarthquakesMicroservice.App

let configureServices (services: IServiceCollection) =
    services.AddGiraffe() |> ignore

let configureApp (app: IApplicationBuilder) =
    let fetchData () = task { return "Earthquake data" }
    let predict () = task { return "Prediction data" }
    
    // todo how http handlers work 
    app.UseGiraffe(webApp fetchData predict)

[<EntryPoint>]
let main args =
    let builder = WebHost.CreateDefaultBuilder(args)
                      .ConfigureServices(configureServices)
                      .Configure(configureApp)
                      .Build()
                      
    builder.Run()
    0