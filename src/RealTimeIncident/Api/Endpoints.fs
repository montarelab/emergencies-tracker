module VolcanoesMicroservice.Api.Endpoints

open System.Threading.Tasks
open Giraffe
open Microsoft.AspNetCore.Http
open VolcanoesMicroservice.Services.VolcanoesService

// todo how to make best endpoints
// todo how to use real time data sending
// todo how to use websockets


// 2 functions are endpoints that return HttpHandler (take next and cts)

let getVolcanoesList (fetchData: unit -> Task<PagedResponse>) = 
    fun (next: HttpFunc) (ctx: HttpContext) -> task {
        let! data = fetchData()
        return! json data next ctx
    }
    
let getVolcanoById (fetchData: unit -> Task<VolcanoDto>) = 
    fun (next: HttpFunc) (ctx: HttpContext) -> task {
        let! data = fetchData()
        return! json data next ctx
    }

let predictVolcanoes (predict: unit -> Task<string>) = 
    fun (next: HttpFunc) (ctx: HttpContext) -> task {
        let! prediction = predict()
        return! json prediction next ctx
    }