import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Messaging

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("5df5acd0d48c2") // Your project ID
    .setKey("919c2d18fb5d4...a2ae413da83346ad2") // Your secret API key

val messaging = Messaging(client)

val response = messaging.updateFCMProvider(
    providerId = "[PROVIDER_ID]",
    name = "[NAME]", // optional
    enabled = false, // optional
    serviceAccountJSON = mapOf( "a" to "b" ) // optional
)
