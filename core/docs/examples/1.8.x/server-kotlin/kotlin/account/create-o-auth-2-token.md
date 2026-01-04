import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Account
import io.bapxdb.enums.OAuthProvider

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setSession("") // The user session to authenticate with

val account = Account(client)

account.createOAuth2Token(
    provider =  OAuthProvider.AMAZON,
    success = "https://example.com", // optional
    failure = "https://example.com", // optional
    scopes = listOf() // optional
)
