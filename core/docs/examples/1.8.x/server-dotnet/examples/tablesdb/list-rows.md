using bapXdb;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetSession(""); // The user session to authenticate with

TablesDB tablesDB = new TablesDB(client);

RowList result = await tablesDB.ListRows(
    databaseId: "<DATABASE_ID>",
    tableId: "<TABLE_ID>",
    queries: new List<string>(), // optional
    transactionId: "<TRANSACTION_ID>", // optional
    total: false // optional
);