package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/storage"
)

func main() {
    client := client.New(
        client.WithEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
        client.WithProject("<YOUR_PROJECT_ID>") // Your project ID
        client.WithSession("") // The user session to authenticate with
    )

    service := storage.New(client)
    response, error := service.CreateFile(
        "<BUCKET_ID>",
        "<FILE_ID>",
        file.NewInputFile("/path/to/file.png", "file.png"),
        storage.WithCreateFilePermissions(interface{}{"read("any")"}),
    )

    if error != nil {
        panic(error)
    }

    fmt.Println(response)
}
