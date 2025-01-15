module VolcanoesMicroservice.Services.HttpClientWrapper

open System
open System.Net.Http
open System.Threading.Tasks
open Giraffe.ComputationExpressions
open Newtonsoft.Json
// open FSharp.Control.Tasks.V2.ContextInsensitive

type VolcanoApiDto = {
    id: string
    name: string
    country: string
    longitude: float
    latitude: float
    elevation: float
    deathsTotal: int
    status: string
    year: int
    month: int
    day: int
}

type PagedApiResponse = {
    items: VolcanoApiDto list
    page: int
    itemsPerPage: int
    totalPages: int
}

let volcanoesListEndpoint = ""
let volcanoByIdEndpoint id = $"/{id}/info"

type VolcanoesHttpClientWrapper(httpClient: HttpClient, baseUrl: string) =

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
    
    member this.GetVolcanoesListAsync(): Task<PagedApiResponse> =
        this.GetAsync<PagedApiResponse>(volcanoesListEndpoint)
        

    member this.GetVolcanoAsyncById(id: string): Task<VolcanoApiDto> = 
        this.GetAsync<VolcanoApiDto>(volcanoByIdEndpoint id)
    
