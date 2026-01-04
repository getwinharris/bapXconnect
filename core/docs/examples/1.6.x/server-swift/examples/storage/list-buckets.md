import bapXdb

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>") // Your secret API key

let storage = Storage(client)

let bucketList = try await storage.listBuckets(
    queries: [], // optional
    search: "<SEARCH>" // optional
)

