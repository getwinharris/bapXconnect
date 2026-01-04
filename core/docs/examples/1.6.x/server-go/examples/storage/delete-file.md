package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/storage"
)

func main() {
    client := client.NewClient()

    client.SetEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    client.SetProject("<YOUR_PROJECT_ID>") // Your project ID
    client.SetSession("") // The user session to authenticate with

    service := storage.NewStorage(client)
    response, error := service.DeleteFile(
        "<BUCKET_ID>",
        "<FILE_ID>",
    )

    if error != nil {
        panic(error)
    }

    fmt.Println(response)
}
