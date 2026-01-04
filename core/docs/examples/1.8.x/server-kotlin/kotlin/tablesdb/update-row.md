import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.TablesDB
import io.bapxdb.Permission
import io.bapxdb.Role

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setSession("") // The user session to authenticate with

val tablesDB = TablesDB(client)

val response = tablesDB.updateRow(
    databaseId = "<DATABASE_ID>",
    tableId = "<TABLE_ID>",
    rowId = "<ROW_ID>",
    data = mapOf(
        "username" to "walter.obrien",
        "email" to "walter.obrien@example.com",
        "fullName" to "Walter O'Brien",
        "age" to 33,
        "isAdmin" to false
    ), // optional
    permissions = listOf(Permission.read(Role.any())), // optional
    transactionId = "<TRANSACTION_ID>" // optional
)
