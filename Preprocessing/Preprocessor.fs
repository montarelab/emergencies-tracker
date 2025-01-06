module TrackEmergencies.Preprocessing.Preprocessor

let preprocess data = 
    // Perform data normalization, cleaning, etc.
    data |> List.map (fun record -> record.Trim())