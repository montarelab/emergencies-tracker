module EarthquakesMicroservice.Services.EarthquakesService

open System.Threading.Tasks
open EarthquakesMicroservice.Services.HttpClientWrapper

type EarthquakeDto = {
    id: string
    area: string
    country: string
    longitude: float
    latitude: float
    magnitude: float
}

type PagedResponse = {
    items: EarthquakeDto list
    page: int
    itemsPerPage: int
    totalPages: int
}

let mapToEarthquakeDto (apiDto: EarthquakeApiDto) : EarthquakeDto =
    {
        id = apiDto.id
        area = apiDto.area
        country = apiDto.country
        longitude = apiDto.longitude
        latitude = apiDto.latitude
        magnitude = apiDto.eqMagnitude
    }

type EarthquakesService(httpClientWrapper: EarthquakesHttpClientWrapper) =
    member this.GetEarthquakeListAsync() : Task<PagedResponse> = task {
        let! response = httpClientWrapper.GetEarthquakesListAsync()
        return {
            items = response.items |> List.map mapToEarthquakeDto
            page = response.page
            itemsPerPage = response.itemsPerPage
            totalPages = response.totalPages
        }
    } 
        
    member this.GetEarthquakeByIdAsync(id: string) = task{
        let! response = httpClientWrapper.GetEarthquakeAsyncById(id)
        return mapToEarthquakeDto response
    } 
        
    // member this.PredictEarthquakes() = 
        // httpClientWrapper.PredictEarthquakes()