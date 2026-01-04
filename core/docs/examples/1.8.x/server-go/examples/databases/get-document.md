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

response, error := service.GetDocument(
    "<DATABASE_ID>",
    "<COLLECTION_ID>",
    "<DOCUMENT_ID>",
    databases.WithGetDocumentQueries([]interface{}{}),
    databases.WithGetDocumentTransactionId("<TRANSACTION_ID>"),
)
