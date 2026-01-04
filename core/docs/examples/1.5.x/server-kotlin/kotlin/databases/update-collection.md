import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Databases

val client = Client()
    .setEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>") // Your secret API key

val databases = Databases(client)

val response = databases.updateCollection(
    databaseId = "<DATABASE_ID>",
    collectionId = "<COLLECTION_ID>",
    name = "<NAME>",
    permissions = listOf("read("any")"), // optional
    documentSecurity = false, // optional
    enabled = false // optional
)
