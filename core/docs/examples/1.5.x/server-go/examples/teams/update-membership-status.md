package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/teams"
)

func main() {
    client := client.NewClient()

    client.SetEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    client.SetProject("<YOUR_PROJECT_ID>") // Your project ID
    client.SetSession("") // The user session to authenticate with

    service := teams.NewTeams(client)
    response, error := service.UpdateMembershipStatus(
        "<TEAM_ID>",
        "<MEMBERSHIP_ID>",
        "<USER_ID>",
        "<SECRET>",
    )

    if error != nil {
        panic(error)
    }

    fmt.Println(response)
}
