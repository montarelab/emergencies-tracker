open System
open System.Net.WebSockets
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.AspNetCore.Http
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting
open Giraffe
open System.Threading
open System.Threading.Tasks
open System.Text

// A simple function to simulate sending a message
let sendMessage () =
    printfn "Sending message at %s" (DateTime.Now.ToString())

// A background service that sends messages every minute
type BackgroundMessageService(webSocket: WebSocket) =
    inherit BackgroundService()

    override _.ExecuteAsync(cancellationToken: CancellationToken) =
        async {
            while not cancellationToken.IsCancellationRequested do
                do! Async.Sleep(60 * 1000)  // Sleep for 1 minute
                sendMessage()  // Simulate sending a message
                let message = Encoding.UTF8.GetBytes("Message from server at " + DateTime.Now.ToString())
                // Send the message to the connected WebSocket client
                try
                    if webSocket.State = WebSocketState.Open then
                        do! webSocket.SendAsync(
                                new ArraySegment<byte>(message),
                                WebSocketMessageType.Text,
                                true,
                                cancellationToken
                            ) |> Async.AwaitTask
                with ex ->
                    printfn "Error sending WebSocket message: %s" ex.Message
        } |> Async.StartAsTask :> Task


// Handler to accept WebSocket connections
let webSocketHandler (context: HttpContext) =
    async {
        // Check if the connection request supports WebSockets
        if context.WebSockets.IsWebSocketRequest then
            let! webSocket = context.WebSockets.AcceptWebSocketAsync() |> Async.AwaitTask
            // Start the background service with the established WebSocket connection
            let backgroundService = new BackgroundMessageService(webSocket)
            do! backgroundService.StartAsync(CancellationToken.None) |> Async.AwaitTask
        else
            context.Response.StatusCode <- 400  // Bad request for non-WebSocket connections
            return ()
    } |> Async.StartAsTask


// The HTTP handler for Giraffe
let webApp =
    choose [
        GET >=>
            choose [
                route "/" >=> text "Giraffe API is running"
                route "/ws" >=> fun next ctx -> webSocketHandler ctx 
            ]
    ]

// Create and configure the host for the Giraffe application
[<EntryPoint>]
let main _ =
    let host = Host.CreateDefaultBuilder()
                    .ConfigureWebHostDefaults(fun webHostBuilder ->
                        webHostBuilder.ConfigureServices(fun services ->
                            services.AddSingleton<BackgroundMessageService>() |> ignore
                            services.AddGiraffe() |> ignore) |> ignore
                        webHostBuilder.Configure(fun app ->
                            app.UseWebSockets() |> ignore  // Enable WebSocket support
                            app.UseGiraffe(webApp)
                        ) |> ignore
                    )
                    .Build()

    host.Run()
    0