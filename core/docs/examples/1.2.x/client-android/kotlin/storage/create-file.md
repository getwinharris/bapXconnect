import io.bapxdb.Client
import io.bapxdb.models.InputFile
import io.bapxdb.services.Storage

val client = Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("5df5acd0d48c2") // Your project ID

val storage = Storage(client)

val response = storage.createFile(
    bucketId = "[BUCKET_ID]",
    fileId = "[FILE_ID]",
    file = InputFile.fromPath("file.png"),
)
