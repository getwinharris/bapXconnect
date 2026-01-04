import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Messaging

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>") // Your secret API key

val messaging = Messaging(client)

val response = messaging.createResendProvider(
    providerId = "<PROVIDER_ID>",
    name = "<NAME>",
    apiKey = "<API_KEY>", // optional
    fromName = "<FROM_NAME>", // optional
    fromEmail = "email@example.com", // optional
    replyToName = "<REPLY_TO_NAME>", // optional
    replyToEmail = "email@example.com", // optional
    enabled = false // optional
)
