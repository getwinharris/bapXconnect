import io.bapxdb.Client
import io.bapxdb.services.Functions

val client = Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("5df5acd0d48c2") // Your project ID

val functions = Functions(client)

val response = functions.listExecutions(
    functionId = "[FUNCTION_ID]",
)
