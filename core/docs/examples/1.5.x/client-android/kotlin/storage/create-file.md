import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.models.InputFile
import io.bapxdb.services.Storage

val client = Client(context)
    .setEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

val storage = Storage(client)

val result = storage.createFile(
    bucketId = "<BUCKET_ID>", 
    fileId = "<FILE_ID>", 
    file = InputFile.fromPath("file.png"), 
    permissions = listOf("read("any")"), // (optional)
)