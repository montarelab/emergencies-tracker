module EarthquakesMicroservice.Dependencies

open System.Net.Http
open EarthquakesMicroservice.Api.HttpClientWrapper


let configureDependencies () =
    let httpClient = new HttpClient()
    let baseUrl = "https://api.example.com"
    let httpClientWrapper = HttpClientWrapper(httpClient, baseUrl)
    httpClientWrapper
