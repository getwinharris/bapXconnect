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

response, error := service.ListRows(
    "<DATABASE_ID>",
    "<TABLE_ID>",
    tablesdb.WithListRowsQueries([]interface{}{}),
    tablesdb.WithListRowsTransactionId("<TRANSACTION_ID>"),
    tablesdb.WithListRowsTotal(false),
)
