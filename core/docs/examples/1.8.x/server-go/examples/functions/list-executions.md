package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/functions"
)

client := client.New(
    client.WithEndpoint("https://<REGION>.cloud.bapxdb.io/v1")
    client.WithProject("<YOUR_PROJECT_ID>")
    client.WithSession("")
)

service := functions.New(client)

response, error := service.ListExecutions(
    "<FUNCTION_ID>",
    functions.WithListExecutionsQueries([]interface{}{}),
    functions.WithListExecutionsTotal(false),
)
