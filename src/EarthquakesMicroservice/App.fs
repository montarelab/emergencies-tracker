module TrackEmergencies.App

open Giraffe
open TrackEmergencies.Api.Endpoints

// add routes

let webApp fetchData predict =
    choose [
        route "/earthquakes/current" >=> getCurrentEarthquakes fetchData
        route "/earthquakes/predict" >=> predictEarthquakes predict
    ] 
