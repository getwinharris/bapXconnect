import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Storage

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setSession("") // The user session to authenticate with

val storage = Storage(client)

val response = storage.listFiles(
    bucketId = "<BUCKET_ID>",
    queries = listOf(), // optional
    search = "<SEARCH>" // optional
)
