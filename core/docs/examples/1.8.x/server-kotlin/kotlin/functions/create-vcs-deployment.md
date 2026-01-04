import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Functions
import io.bapxdb.enums.VCSReferenceType

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>") // Your secret API key

val functions = Functions(client)

val response = functions.createVcsDeployment(
    functionId = "<FUNCTION_ID>",
    type =  VCSReferenceType.BRANCH,
    reference = "<REFERENCE>",
    activate = false // optional
)
