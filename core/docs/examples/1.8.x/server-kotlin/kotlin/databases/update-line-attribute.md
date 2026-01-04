import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Databases

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>") // Your secret API key

val databases = Databases(client)

val response = databases.updateLineAttribute(
    databaseId = "<DATABASE_ID>",
    collectionId = "<COLLECTION_ID>",
    key = "",
    required = false,
    default = listOf(listOf(1, 2), listOf(3, 4), listOf(5, 6)), // optional
    newKey = "" // optional
)
