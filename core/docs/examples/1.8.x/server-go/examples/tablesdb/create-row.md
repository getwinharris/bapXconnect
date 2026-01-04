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

response, error := service.CreateRow(
    "<DATABASE_ID>",
    "<TABLE_ID>",
    "<ROW_ID>",
    map[string]interface{}{
        "username": "walter.obrien",
        "email": "walter.obrien@example.com",
        "fullName": "Walter O'Brien",
        "age": 30,
        "isAdmin": false
    },
    tablesdb.WithCreateRowPermissions(interface{}{"read("any")"}),
    tablesdb.WithCreateRowTransactionId("<TRANSACTION_ID>"),
)
