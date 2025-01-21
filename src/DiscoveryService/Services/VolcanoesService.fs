module VolcanoesMicroservice.Services.VolcanoesService

open System
open System.Globalization
open System.Threading.Tasks
open VolcanoesMicroservice.Services.HttpClientWrapper

type VolcanoDto = {
    id: string
    name: string
    country: string
    longitude: float
    latitude: float
    elevation: float
    deathsTotal: int
    status: string
    date: DateTime
}

type PagedResponse = {
    items: VolcanoDto list
    page: int
    itemsPerPage: int
    totalPages: int
}

let mapToVolcanoDto (apiDto: VolcanoApiDto) : VolcanoDto =        
    let day = if apiDto.day = 0 then 1 else apiDto.day
    let month = if apiDto.month = 0 then 1 else apiDto.month
    
    {
        id = apiDto.id
        name = apiDto.name
        country = apiDto.country
        longitude = apiDto.longitude
        latitude = apiDto.latitude
        elevation = apiDto.elevation
        deathsTotal = apiDto.deathsTotal
        status = apiDto.status
        date = DateTime(apiDto.year, month, day)  
    }

type VolcanoesService(httpClientWrapper: VolcanoesHttpClientWrapper) =
    member this.GetVolcanoesListAsync() : Task<PagedResponse> = task {
        let! response = httpClientWrapper.GetVolcanoesListAsync()
        return {
            items = response.items
                    |> List.filter (fun volcano -> volcano.year >= 0)
                    |> List.map mapToVolcanoDto
            page = response.page
            itemsPerPage = response.itemsPerPage
            totalPages = response.totalPages
        }
    } 
        
    member this.GetVolcanoByIdAsync(id: string) = task{
        let! response = httpClientWrapper.GetVolcanoAsyncById(id)
        return mapToVolcanoDto response
    } 
        
    // member this.PredictEarthquakes() = 
        // httpClientWrapper.PredictEarthquakes()