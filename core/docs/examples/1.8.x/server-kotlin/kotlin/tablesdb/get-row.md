import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.TablesDB

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setSession("") // The user session to authenticate with

val tablesDB = TablesDB(client)

val response = tablesDB.getRow(
    databaseId = "<DATABASE_ID>",
    tableId = "<TABLE_ID>",
    rowId = "<ROW_ID>",
    queries = listOf(), // optional
    transactionId = "<TRANSACTION_ID>" // optional
)
