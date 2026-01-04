import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Avatars

val client = Client()
    .setEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setSession("") // The user session to authenticate with

val avatars = Avatars(client)

val result = avatars.getQR(
    text = "<TEXT>",
    size = 1, // optional
    margin = 0, // optional
    download = false // optional
)
