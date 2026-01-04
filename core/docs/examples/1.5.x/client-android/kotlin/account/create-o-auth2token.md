import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Account
import io.bapxdb.enums.OAuthProvider

val client = Client(context)
    .setEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

val account = Account(client)

account.createOAuth2Token(
    provider = OAuthProvider.AMAZON,
    success = "https://example.com", // (optional)
    failure = "https://example.com", // (optional)
    scopes = listOf(), // (optional)
)