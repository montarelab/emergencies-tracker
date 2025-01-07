module TrackEmergencies.Api.Endpoints

open System.Threading.Tasks
open Giraffe
open Microsoft.AspNetCore.Http

// todo how to make best endpoints
// todo how to use real time data sending
// todo how to use websockets


let getCurrentEarthquakes (fetchData: unit -> Task<string>) = 
    fun (next: HttpFunc) (ctx: HttpContext) -> task {
        let! data = fetchData()
        return! json data next ctx
    }

let predictEarthquakes (predict: unit -> Task<string>) = 
    fun (next: HttpFunc) (ctx: HttpContext) -> task {
        let! prediction = predict()
        return! json prediction next ctx
    }