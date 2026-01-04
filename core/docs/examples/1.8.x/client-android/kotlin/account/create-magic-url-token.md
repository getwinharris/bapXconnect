import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Account

val client = Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

val account = Account(client)

val result = account.createMagicURLToken(
    userId = "<USER_ID>", 
    email = "email@example.com", 
    url = "https://example.com", // (optional)
    phrase = false, // (optional)
)