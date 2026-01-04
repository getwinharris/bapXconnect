import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Functions

val client = Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

val functions = Functions(client)

val result = functions.getExecution(
    functionId = "<FUNCTION_ID>", 
    executionId = "<EXECUTION_ID>", 
)