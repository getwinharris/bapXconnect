import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.services.Functions;
import io.bapxdb.enums.TemplateReferenceType;

Client client = new Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>"); // Your secret API key

Functions functions = new Functions(client);

functions.createTemplateDeployment(
    "<FUNCTION_ID>", // functionId
    "<REPOSITORY>", // repository
    "<OWNER>", // owner
    "<ROOT_DIRECTORY>", // rootDirectory
    TemplateReferenceType.COMMIT, // type
    "<REFERENCE>", // reference
    false, // activate (optional)
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        System.out.println(result);
    })
);

