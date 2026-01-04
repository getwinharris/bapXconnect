using bapXdb;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetKey("<YOUR_API_KEY>"); // Your secret API key

TablesDB tablesDB = new TablesDB(client);

ColumnIndexList result = await tablesDB.ListIndexes(
    databaseId: "<DATABASE_ID>",
    tableId: "<TABLE_ID>",
    queries: new List<string>(), // optional
    total: false // optional
);