import bapXdb

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>") // Your secret API key

let tablesDB = TablesDB(client)

let columnEnum = try await tablesDB.updateEnumColumn(
    databaseId: "<DATABASE_ID>",
    tableId: "<TABLE_ID>",
    key: "",
    elements: [],
    required: false,
    default: "<DEFAULT>",
    newKey: "" // optional
)

