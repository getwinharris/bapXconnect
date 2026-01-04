package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/avatars"
)

client := client.New(
    client.WithEndpoint("https://<REGION>.cloud.bapxdb.io/v1")
    client.WithProject("<YOUR_PROJECT_ID>")
    client.WithSession("")
)

service := avatars.New(client)

response, error := service.GetImage(
    "https://example.com",
    avatars.WithGetImageWidth(0),
    avatars.WithGetImageHeight(0),
)
