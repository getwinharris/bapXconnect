import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.TablesDB

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>") // Your secret API key

val tablesDB = TablesDB(client)

val response = tablesDB.createEmailColumn(
    databaseId = "<DATABASE_ID>",
    tableId = "<TABLE_ID>",
    key = "",
    required = false,
    default = "email@example.com", // optional
    array = false // optional
)
