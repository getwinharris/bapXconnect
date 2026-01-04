package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/tablesdb"
)

client := client.New(
    client.WithEndpoint("https://<REGION>.cloud.bapxdb.io/v1")
    client.WithProject("<YOUR_PROJECT_ID>")
    client.WithSession("")
)

service := tablesdb.New(client)

response, error := service.DeleteRow(
    "<DATABASE_ID>",
    "<TABLE_ID>",
    "<ROW_ID>",
    tablesdb.WithDeleteRowTransactionId("<TRANSACTION_ID>"),
)
