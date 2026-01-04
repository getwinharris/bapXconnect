import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Avatars
import io.bapxdb.enums.Browser

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setSession("") // The user session to authenticate with

val avatars = Avatars(client)

val result = avatars.getBrowser(
    code =  Browser.AVANT_BROWSER,
    width = 0, // optional
    height = 0, // optional
    quality = -1 // optional
)
