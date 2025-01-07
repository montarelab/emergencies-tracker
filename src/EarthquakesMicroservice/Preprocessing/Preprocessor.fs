module TrackEmergencies.Preprocessing.Preprocessor

// todo fix problem
// todo how can we preprocess best

let preprocess data = 
    // Perform data normalization, cleaning, etc.
    data |> List.map (fun record -> record.Trim())