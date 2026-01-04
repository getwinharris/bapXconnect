import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Users
import io.bapxdb.enums.AuthenticatorProvider

val client = Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("5df5acd0d48c2") // Your project ID

val users = Users(client)

val response = users.deleteAuthenticator(
    userId = "[USER_ID]",
    provider = AuthenticatorProvider.TOTP,
    otp = "[OTP]",
)