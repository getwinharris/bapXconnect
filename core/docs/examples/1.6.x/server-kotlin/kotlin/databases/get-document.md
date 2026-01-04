import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Databases

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setSession("") // The user session to authenticate with

val databases = Databases(client)

val response = databases.getDocument(
    databaseId = "<DATABASE_ID>",
    collectionId = "<COLLECTION_ID>",
    documentId = "<DOCUMENT_ID>",
    queries = listOf() // optional
)
