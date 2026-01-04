package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/databases"
)

func main() {
    client := client.New(
        client.WithEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
        client.WithProject("<YOUR_PROJECT_ID>") // Your project ID
        client.WithKey("<YOUR_API_KEY>") // Your secret API key
    )

    service := databases.New(client)
    response, error := service.CreateIntegerAttribute(
        "<DATABASE_ID>",
        "<COLLECTION_ID>",
        "",
        false,
        databases.WithCreateIntegerAttributeMin(0),
        databases.WithCreateIntegerAttributeMax(0),
        databases.WithCreateIntegerAttributeDefault(0),
        databases.WithCreateIntegerAttributeArray(false),
    )

    if error != nil {
        panic(error)
    }

    fmt.Println(response)
}
