import bapXdb

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setSession("") // The user session to authenticate with

let tablesDB = TablesDB(client)

let row = try await tablesDB.updateRow(
    databaseId: "<DATABASE_ID>",
    tableId: "<TABLE_ID>",
    rowId: "<ROW_ID>",
    data: [
        "username": "walter.obrien",
        "email": "walter.obrien@example.com",
        "fullName": "Walter O'Brien",
        "age": 33,
        "isAdmin": false
    ], // optional
    permissions: [Permission.read(Role.any())], // optional
    transactionId: "<TRANSACTION_ID>" // optional
)

