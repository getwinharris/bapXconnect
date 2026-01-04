package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/account"
)

func main() {
    client := client.NewClient()

    client.SetEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    client.SetProject("<YOUR_PROJECT_ID>") // Your project ID
    client.SetSession("") // The user session to authenticate with

    service := account.NewAccount(client)
    response, error := service.UpdateMfaAuthenticator(
        "totp",
        "<OTP>",
    )

    if error != nil {
        panic(error)
    }

    fmt.Println(response)
}
