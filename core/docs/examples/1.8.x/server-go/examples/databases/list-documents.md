package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/databases"
)

client := client.New(
    client.WithEndpoint("https://<REGION>.cloud.bapxdb.io/v1")
    client.WithProject("<YOUR_PROJECT_ID>")
    client.WithSession("")
)

service := databases.New(client)

response, error := service.ListDocuments(
    "<DATABASE_ID>",
    "<COLLECTION_ID>",
    databases.WithListDocumentsQueries([]interface{}{}),
    databases.WithListDocumentsTransactionId("<TRANSACTION_ID>"),
    databases.WithListDocumentsTotal(false),
)
