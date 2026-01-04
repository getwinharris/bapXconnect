import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Users
import io.bapxdb.enums.AuthenticatorType

val client = Client()
    .setEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>") // Your secret API key

val users = Users(client)

val response = users.deleteMfaAuthenticator(
    userId = "<USER_ID>",
    type =  AuthenticatorType.TOTP
)
