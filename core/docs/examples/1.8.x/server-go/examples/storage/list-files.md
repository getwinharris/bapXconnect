package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/storage"
)

client := client.New(
    client.WithEndpoint("https://<REGION>.cloud.bapxdb.io/v1")
    client.WithProject("<YOUR_PROJECT_ID>")
    client.WithSession("")
)

service := storage.New(client)

response, error := service.ListFiles(
    "<BUCKET_ID>",
    storage.WithListFilesQueries([]interface{}{}),
    storage.WithListFilesSearch("<SEARCH>"),
    storage.WithListFilesTotal(false),
)
