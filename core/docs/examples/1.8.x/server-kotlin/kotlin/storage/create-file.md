import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.models.InputFile
import io.bapxdb.services.Storage
import io.bapxdb.Permission
import io.bapxdb.Role

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setSession("") // The user session to authenticate with

val storage = Storage(client)

val response = storage.createFile(
    bucketId = "<BUCKET_ID>",
    fileId = "<FILE_ID>",
    file = InputFile.fromPath("file.png"),
    permissions = listOf(Permission.read(Role.any())) // optional
)
