import bapXdb

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

let databases = Databases(client)

let transactionList = try await databases.listTransactions(
    queries: [] // optional
)

