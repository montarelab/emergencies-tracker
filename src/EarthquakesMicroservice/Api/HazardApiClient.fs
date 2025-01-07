module EarthquakesMicroservice.Api.HttpClientWrapper

open System.Net.Http
open System.Threading.Tasks
// open FSharp.Control.Tasks.V2.ContextInsensitive

// todo: make it normal

type HttpClientWrapper(httpClient: HttpClient, baseUrl: string) =
    member _.GetAsync(endpoint: string): Task<string> = task {
        let url = $"{baseUrl}/{endpoint}"
        let! response = httpClient.GetAsync(url)
        response.EnsureSuccessStatusCode() |> ignore
        return! response.Content.ReadAsStringAsync()
    }