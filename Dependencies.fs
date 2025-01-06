module TrackEmergencies.Dependencies

open System.Net.Http
open TrackEmergencies.Api.HttpClientWrapper


let configureDependencies () =
    let httpClient = new HttpClient()
    let baseUrl = "https://api.example.com"
    let httpClientWrapper = HttpClientWrapper(httpClient, baseUrl)
    httpClientWrapper
