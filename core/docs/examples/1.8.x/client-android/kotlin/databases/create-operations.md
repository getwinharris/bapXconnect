import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Databases

val client = Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

val databases = Databases(client)

val result = databases.createOperations(
    transactionId = "<TRANSACTION_ID>", 
    operations = listOf(mapOf(
        "action" to "create",
        "databaseId" to "<DATABASE_ID>",
        "collectionId" to "<COLLECTION_ID>",
        "documentId" to "<DOCUMENT_ID>",
        "data" to mapOf(
            "name" to "Walter O'Brien"
        )
    )), // (optional)
)