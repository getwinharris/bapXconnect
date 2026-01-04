import bapXdb

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("5df5acd0d48c2") // Your project ID

let storage = Storage(client)

let fileList = try await storage.listFiles(
    bucketId: "[BUCKET_ID]"
)

