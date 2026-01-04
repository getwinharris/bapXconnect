package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/users"
)

client := client.New(
    client.WithEndpoint("https://<REGION>.cloud.bapxdb.io/v1")
    client.WithProject("<YOUR_PROJECT_ID>")
    client.WithKey("<YOUR_API_KEY>")
)

service := users.New(client)

response, error := service.CreateMD5User(
    "<USER_ID>",
    "email@example.com",
    "password",
    users.WithCreateMD5UserName("<NAME>"),
)
