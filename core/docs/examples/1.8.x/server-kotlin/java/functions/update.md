import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.services.Functions;
import io.bapxdb.enums.Runtime;

Client client = new Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>"); // Your secret API key

Functions functions = new Functions(client);

functions.update(
    "<FUNCTION_ID>", // functionId
    "<NAME>", // name
    Runtime.NODE_14_5, // runtime (optional)
    List.of("any"), // execute (optional)
    List.of(), // events (optional)
    "", // schedule (optional)
    1, // timeout (optional)
    false, // enabled (optional)
    false, // logging (optional)
    "<ENTRYPOINT>", // entrypoint (optional)
    "<COMMANDS>", // commands (optional)
    List.of(), // scopes (optional)
    "<INSTALLATION_ID>", // installationId (optional)
    "<PROVIDER_REPOSITORY_ID>", // providerRepositoryId (optional)
    "<PROVIDER_BRANCH>", // providerBranch (optional)
    false, // providerSilentMode (optional)
    "<PROVIDER_ROOT_DIRECTORY>", // providerRootDirectory (optional)
    "", // specification (optional)
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        System.out.println(result);
    })
);

