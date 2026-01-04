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

response, error := service.GetCreditCard(
    "amex",
    avatars.WithGetCreditCardWidth(0),
    avatars.WithGetCreditCardHeight(0),
    avatars.WithGetCreditCardQuality(-1),
)
