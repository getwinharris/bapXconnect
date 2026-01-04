import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.models.InputFile;
import io.bapxdb.services.Sites;

Client client = new Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>"); // Your secret API key

Sites sites = new Sites(client);

sites.createDeployment(
    "<SITE_ID>", // siteId
    InputFile.fromPath("file.png"), // code
    false, // activate
    "<INSTALL_COMMAND>", // installCommand (optional)
    "<BUILD_COMMAND>", // buildCommand (optional)
    "<OUTPUT_DIRECTORY>", // outputDirectory (optional)
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        System.out.println(result);
    })
);

