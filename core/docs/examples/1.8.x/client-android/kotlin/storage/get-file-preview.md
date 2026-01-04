import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Storage
import io.bapxdb.enums.ImageGravity
import io.bapxdb.enums.ImageFormat

val client = Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

val storage = Storage(client)

val result = storage.getFilePreview(
    bucketId = "<BUCKET_ID>", 
    fileId = "<FILE_ID>", 
    width = 0, // (optional)
    height = 0, // (optional)
    gravity = ImageGravity.CENTER, // (optional)
    quality = -1, // (optional)
    borderWidth = 0, // (optional)
    borderColor = "", // (optional)
    borderRadius = 0, // (optional)
    opacity = 0, // (optional)
    rotation = -360, // (optional)
    background = "", // (optional)
    output = ImageFormat.JPG, // (optional)
    token = "<TOKEN>", // (optional)
)