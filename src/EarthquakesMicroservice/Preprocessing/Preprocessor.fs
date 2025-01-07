module EarthquakesMicroservice.Preprocessing.Preprocessor

// todo how can we preprocess best

let preprocess data = 
    // Perform data normalization, cleaning, etc.
    data |> List.map (fun (record: string) -> record.Trim())