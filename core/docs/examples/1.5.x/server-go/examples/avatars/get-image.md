package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/avatars"
)

func main() {
    client := client.NewClient()

    client.SetEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    client.SetProject("<YOUR_PROJECT_ID>") // Your project ID
    client.SetSession("") // The user session to authenticate with

    service := avatars.NewAvatars(client)
    response, error := service.GetImage(
        "https://example.com",
        avatars.WithGetImageWidth(0),
        avatars.WithGetImageHeight(0),
    )

    if error != nil {
        panic(error)
    }

    fmt.Println(response)
}
