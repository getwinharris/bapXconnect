package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/functions"
)

func main() {
    client := client.New(
        client.WithEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
        client.WithProject("<YOUR_PROJECT_ID>") // Your project ID
        client.WithKey("<YOUR_API_KEY>") // Your secret API key
    )

    service := functions.New(client)
    response, error := service.CreateDeployment(
        "<FUNCTION_ID>",
        file.NewInputFile("/path/to/file.png", "file.png"),
        false,
        functions.WithCreateDeploymentEntrypoint("<ENTRYPOINT>"),
        functions.WithCreateDeploymentCommands("<COMMANDS>"),
    )

    if error != nil {
        panic(error)
    }

    fmt.Println(response)
}
