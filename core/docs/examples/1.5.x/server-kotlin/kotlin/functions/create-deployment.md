import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.models.InputFile
import io.bapxdb.services.Functions

val client = Client()
    .setEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>") // Your secret API key

val functions = Functions(client)

val response = functions.createDeployment(
    functionId = "<FUNCTION_ID>",
    code = InputFile.fromPath("file.png"),
    activate = false,
    entrypoint = "<ENTRYPOINT>", // optional
    commands = "<COMMANDS>" // optional
)
