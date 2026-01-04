import io.bapxdb.Client
import io.bapxdb.services.Databases

val client = Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("5df5acd0d48c2") // Your project ID

val databases = Databases(client)

val response = databases.updateDocument(
    databaseId = "[DATABASE_ID]",
    collectionId = "[COLLECTION_ID]",
    documentId = "[DOCUMENT_ID]",
)
