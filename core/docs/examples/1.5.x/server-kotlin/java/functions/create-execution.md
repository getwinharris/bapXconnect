import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.services.Functions;

Client client = new Client()
    .setEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setSession(""); // The user session to authenticate with

Functions functions = new Functions(client);

functions.createExecution(
    "<FUNCTION_ID>", // functionId
    "<BODY>", // body (optional)
    false, // async (optional)
    "<PATH>", // path (optional)
    ExecutionMethod.GET, // method (optional)
    mapOf( "a" to "b" ), // headers (optional)
    "", // scheduledAt (optional)
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        System.out.println(result);
    })
);

