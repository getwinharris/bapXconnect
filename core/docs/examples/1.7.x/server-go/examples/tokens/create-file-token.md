package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/tokens"
)

func main() {
    client := client.New(
        client.WithEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
        client.WithProject("<YOUR_PROJECT_ID>") // Your project ID
        client.WithKey("<YOUR_API_KEY>") // Your secret API key
    )

    service := tokens.New(client)
    response, error := service.CreateFileToken(
        "<BUCKET_ID>",
        "<FILE_ID>",
        tokens.WithCreateFileTokenExpire(""),
    )

    if error != nil {
        panic(error)
    }

    fmt.Println(response)
}
