package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/messaging"
)

client := client.New(
    client.WithEndpoint("https://<REGION>.cloud.bapxdb.io/v1")
    client.WithProject("<YOUR_PROJECT_ID>")
    client.WithJWT("<YOUR_JWT>")
)

service := messaging.New(client)

response, error := service.CreateSubscriber(
    "<TOPIC_ID>",
    "<SUBSCRIBER_ID>",
    "<TARGET_ID>",
)
