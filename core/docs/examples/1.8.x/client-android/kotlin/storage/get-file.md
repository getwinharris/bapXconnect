import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Storage

val client = Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

val storage = Storage(client)

val result = storage.getFile(
    bucketId = "<BUCKET_ID>", 
    fileId = "<FILE_ID>", 
)