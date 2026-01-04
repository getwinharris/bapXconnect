import bapXdb

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("5df5acd0d48c2") // Your project ID

let storage = Storage(client)

let result = try await storage.deleteFile(
    bucketId: "[BUCKET_ID]",
    fileId: "[FILE_ID]"
)

