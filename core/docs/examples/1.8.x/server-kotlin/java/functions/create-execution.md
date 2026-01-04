import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.services.Functions;
import io.bapxdb.enums.ExecutionMethod;

Client client = new Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setSession(""); // The user session to authenticate with

Functions functions = new Functions(client);

functions.createExecution(
    "<FUNCTION_ID>", // functionId
    "<BODY>", // body (optional)
    false, // async (optional)
    "<PATH>", // path (optional)
    ExecutionMethod.GET, // method (optional)
    Map.of("a", "b"), // headers (optional)
    "<SCHEDULED_AT>", // scheduledAt (optional)
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        System.out.println(result);
    })
);

