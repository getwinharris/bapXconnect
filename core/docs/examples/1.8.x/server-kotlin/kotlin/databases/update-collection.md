import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Databases
import io.bapxdb.Permission
import io.bapxdb.Role

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>") // Your secret API key

val databases = Databases(client)

val response = databases.updateCollection(
    databaseId = "<DATABASE_ID>",
    collectionId = "<COLLECTION_ID>",
    name = "<NAME>",
    permissions = listOf(Permission.read(Role.any())), // optional
    documentSecurity = false, // optional
    enabled = false // optional
)
