import bapXdb

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

let tablesDB = TablesDB(client)

let transaction = try await tablesDB.createTransaction(
    ttl: 60 // optional
)

