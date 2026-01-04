package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/messaging"
)

func main() {
    client := client.New(
        client.WithEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
        client.WithProject("<YOUR_PROJECT_ID>") // Your project ID
        client.WithKey("<YOUR_API_KEY>") // Your secret API key
    )

    service := messaging.New(client)
    response, error := service.UpdateMailgunProvider(
        "<PROVIDER_ID>",
        messaging.WithUpdateMailgunProviderName("<NAME>"),
        messaging.WithUpdateMailgunProviderApiKey("<API_KEY>"),
        messaging.WithUpdateMailgunProviderDomain("<DOMAIN>"),
        messaging.WithUpdateMailgunProviderIsEuRegion(false),
        messaging.WithUpdateMailgunProviderEnabled(false),
        messaging.WithUpdateMailgunProviderFromName("<FROM_NAME>"),
        messaging.WithUpdateMailgunProviderFromEmail("email@example.com"),
        messaging.WithUpdateMailgunProviderReplyToName("<REPLY_TO_NAME>"),
        messaging.WithUpdateMailgunProviderReplyToEmail("<REPLY_TO_EMAIL>"),
    )

    if error != nil {
        panic(error)
    }

    fmt.Println(response)
}
