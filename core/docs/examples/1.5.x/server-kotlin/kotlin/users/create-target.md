import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Users
import io.bapxdb.enums.MessagingProviderType

val client = Client()
    .setEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>") // Your secret API key

val users = Users(client)

val response = users.createTarget(
    userId = "<USER_ID>",
    targetId = "<TARGET_ID>",
    providerType =  MessagingProviderType.EMAIL,
    identifier = "<IDENTIFIER>",
    providerId = "<PROVIDER_ID>", // optional
    name = "<NAME>" // optional
)
