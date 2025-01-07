module EarthquakesMicroservice.App

open Giraffe
open EarthquakesMicroservice.Api.Endpoints

// add routes

let webApp fetchData predict =
    choose [
        route "/earthquakes/current" >=> getCurrentEarthquakes fetchData
        route "/earthquakes/predict" >=> predictEarthquakes predict
    ] 
