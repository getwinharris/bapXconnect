import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Tokens

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>") // Your secret API key

val tokens = Tokens(client)

val response = tokens.list(
    bucketId = "<BUCKET_ID>",
    fileId = "<FILE_ID>",
    queries = listOf(), // optional
    total = false // optional
)
