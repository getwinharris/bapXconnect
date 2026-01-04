import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Account
import io.bapxdb.enums.AuthenticatorType

val client = Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

val account = Account(client)

val result = account.updateMfaAuthenticator(
    type = AuthenticatorType.TOTP,
    otp = "<OTP>", 
)