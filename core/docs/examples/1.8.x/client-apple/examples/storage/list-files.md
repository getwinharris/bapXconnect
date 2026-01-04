import bapXdb

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

let storage = Storage(client)

let fileList = try await storage.listFiles(
    bucketId: "<BUCKET_ID>",
    queries: [], // optional
    search: "<SEARCH>", // optional
    total: false // optional
)

