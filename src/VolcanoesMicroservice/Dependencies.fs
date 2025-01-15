module VolcanoesMicroservice.Dependencies

open System.Net.Http
open VolcanoesMicroservice.Services.HttpClientWrapper


let configureDependencies () =
    let httpClient = new HttpClient()
    let baseUrl = "https://www.ngdc.noaa.gov/hazel/hazard-service/api/v1/earthquakes"
    let httpClientWrapper = EarthquakesHttpClientWrapper(httpClient, baseUrl)
    httpClientWrapper
