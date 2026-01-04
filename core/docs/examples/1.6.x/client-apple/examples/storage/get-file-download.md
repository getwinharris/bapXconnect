import bapXdb

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

let storage = Storage(client)

let bytes = try await storage.getFileDownload(
    bucketId: "<BUCKET_ID>",
    fileId: "<FILE_ID>"
)

