package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/tablesdb"
)

client := client.New(
    client.WithEndpoint("https://<REGION>.cloud.bapxdb.io/v1")
    client.WithProject("<YOUR_PROJECT_ID>")
    client.WithKey("<YOUR_API_KEY>")
)

service := tablesdb.New(client)

response, error := service.CreateLineColumn(
    "<DATABASE_ID>",
    "<TABLE_ID>",
    "",
    false,
    tablesdb.WithCreateLineColumnDefault(interface{}{[1, 2], [3, 4], [5, 6]}),
)
