package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/databases"
)

func main() {
    client := client.NewClient()

    client.SetEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    client.SetProject("<YOUR_PROJECT_ID>") // Your project ID
    client.SetKey("<YOUR_API_KEY>") // Your secret API key

    service := databases.NewDatabases(client)
    response, error := service.UpdateFloatAttribute(
        "<DATABASE_ID>",
        "<COLLECTION_ID>",
        "",
        false,
        0,
        databases.WithUpdateFloatAttributeMin(0),
        databases.WithUpdateFloatAttributeMax(0),
        databases.WithUpdateFloatAttributeNewKey(""),
    )

    if error != nil {
        panic(error)
    }

    fmt.Println(response)
}
