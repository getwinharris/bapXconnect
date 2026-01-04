import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.TablesDB

val client = Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

val tablesDB = TablesDB(client)

val result = tablesDB.decrementRowColumn(
    databaseId = "<DATABASE_ID>", 
    tableId = "<TABLE_ID>", 
    rowId = "<ROW_ID>", 
    column = "", 
    value = 0, // (optional)
    min = 0, // (optional)
    transactionId = "<TRANSACTION_ID>", // (optional)
)