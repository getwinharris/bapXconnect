import bapXdb

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

let tablesDB = TablesDB(client)

let result = try await tablesDB.deleteTransaction(
    transactionId: "<TRANSACTION_ID>"
)

