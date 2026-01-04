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

response, error := service.UpdateTable(
    "<DATABASE_ID>",
    "<TABLE_ID>",
    "<NAME>",
    tablesdb.WithUpdateTablePermissions(interface{}{"read("any")"}),
    tablesdb.WithUpdateTableRowSecurity(false),
    tablesdb.WithUpdateTableEnabled(false),
)
