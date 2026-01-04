import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Databases
import io.bapxdb.Permission
import io.bapxdb.Role

val client = Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

val databases = Databases(client)

val result = databases.createDocument(
    databaseId = "<DATABASE_ID>", 
    collectionId = "<COLLECTION_ID>", 
    documentId = "<DOCUMENT_ID>", 
    data = mapOf(
        "username" to "walter.obrien",
        "email" to "walter.obrien@example.com",
        "fullName" to "Walter O'Brien",
        "age" to 30,
        "isAdmin" to false
    ), 
    permissions = listOf(Permission.read(Role.any())), // (optional)
    transactionId = "<TRANSACTION_ID>", // (optional)
)