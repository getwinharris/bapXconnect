import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Account
import io.bapxdb.enums.AuthenticationFactor

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("5df5acd0d48c2") // Your project ID

val account = Account(client)

val response = account.create2FAChallenge(
    factor =  AuthenticationFactor.TOTP
)
