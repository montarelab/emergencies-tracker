module VolcanoesMicroservice.Services.HttpClientWrapper

open System
open System.Net.Http
open System.Threading.Tasks
open Giraffe.ComputationExpressions
open Newtonsoft.Json
// open FSharp.Control.Tasks.V2.ContextInsensitive

type EarthquakeApiDto = {
    id: string
    area: string
    country: string
    longitude: float
    latitude: float
    eqMagnitude: float
    date: DateTime
}

type PagedApiResponse = {
    items: EarthquakeApiDto list
    page: int
    itemsPerPage: int
    totalPages: int
}

let earthquakesListEndpoint = ""
let earthquakeByIdEndpoint id = $"/{id}/info"

type EarthquakesHttpClientWrapper(httpClient: HttpClient, baseUrl: string) =

    // task {} here is a computation expression, which contains async code in a better way
    // let! is used to await the async code
    // we can also use do! to run async code without returning a value
    member private this.GetAsync<'T>(endpoint: string): Task<'T> = task {
        let url = $"{baseUrl}/{endpoint}"
        let! response = httpClient.GetAsync(url)
        response.EnsureSuccessStatusCode() |> ignore
        let! data = response.Content.ReadAsStringAsync()
        return JsonConvert.DeserializeObject<'T>(data)
    }
    
    member this.GetEarthquakesListAsync(): Task<PagedApiResponse> =
        this.GetAsync<PagedApiResponse>(earthquakesListEndpoint)
        

    member this.GetEarthquakeAsyncById(id: string): Task<EarthquakeApiDto> = 
        this.GetAsync<EarthquakeApiDto>(earthquakeByIdEndpoint id)
    
