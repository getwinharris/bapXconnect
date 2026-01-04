import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.TablesDB

val client = Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

val tablesDB = TablesDB(client)

val result = tablesDB.listRows(
    databaseId = "<DATABASE_ID>", 
    tableId = "<TABLE_ID>", 
    queries = listOf(), // (optional)
    transactionId = "<TRANSACTION_ID>", // (optional)
    total = false, // (optional)
)