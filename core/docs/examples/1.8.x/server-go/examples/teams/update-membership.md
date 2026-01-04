package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/teams"
)

client := client.New(
    client.WithEndpoint("https://<REGION>.cloud.bapxdb.io/v1")
    client.WithProject("<YOUR_PROJECT_ID>")
    client.WithSession("")
)

service := teams.New(client)

response, error := service.UpdateMembership(
    "<TEAM_ID>",
    "<MEMBERSHIP_ID>",
    []interface{}{},
)
