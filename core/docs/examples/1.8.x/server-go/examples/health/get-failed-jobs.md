package main

import (
    "fmt"
    "github.com/bapxdb/sdk-for-go/client"
    "github.com/bapxdb/sdk-for-go/health"
)

client := client.New(
    client.WithEndpoint("https://<REGION>.cloud.bapxdb.io/v1")
    client.WithProject("<YOUR_PROJECT_ID>")
    client.WithKey("<YOUR_API_KEY>")
)

service := health.New(client)

response, error := service.GetFailedJobs(
    "v1-database",
    health.WithGetFailedJobsThreshold(0),
)
