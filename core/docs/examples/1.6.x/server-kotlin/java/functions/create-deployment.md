import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.models.InputFile;
import io.bapxdb.services.Functions;

Client client = new Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>"); // Your secret API key

Functions functions = new Functions(client);

functions.createDeployment(
    "<FUNCTION_ID>", // functionId
    InputFile.fromPath("file.png"), // code
    false, // activate
    "<ENTRYPOINT>", // entrypoint (optional)
    "<COMMANDS>", // commands (optional)
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        System.out.println(result);
    })
);

