module TrackEmergencies.Api.EarthquakesService

open EarthquakesMicroservice.Api.HttpClientWrapper

type EarthquakesService(httpClientWrapper: EarthquakesHttpClientWrapper) =
    member this.GetEarthquakeList() = 
        httpClientWrapper.GetEarthquakesListAsync()
    member this.GetEarthquakeById(id: string) = 
        httpClientWrapper.GetEarthquakeAsyncById(id)
    // member this.PredictEarthquakes() = 
        // httpClientWrapper.PredictEarthquakes()