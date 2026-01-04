import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Account

val client = Client(context)
    .setEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

val account = Account(client)

val result = account.deleteSession(
    sessionId = "<SESSION_ID>", 
)