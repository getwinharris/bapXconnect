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

response, error := service.CreateExecution(
    "<FUNCTION_ID>",
    functions.WithCreateExecutionBody("<BODY>"),
    functions.WithCreateExecutionAsync(false),
    functions.WithCreateExecutionPath("<PATH>"),
    functions.WithCreateExecutionMethod("GET"),
    functions.WithCreateExecutionHeaders(map[string]interface{}{}),
    functions.WithCreateExecutionScheduledAt("<SCHEDULED_AT>"),
)
