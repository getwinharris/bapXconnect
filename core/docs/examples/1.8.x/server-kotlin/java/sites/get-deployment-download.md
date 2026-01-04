import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.services.Sites;
import io.bapxdb.enums.DeploymentDownloadType;

Client client = new Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>"); // Your secret API key

Sites sites = new Sites(client);

sites.getDeploymentDownload(
    "<SITE_ID>", // siteId
    "<DEPLOYMENT_ID>", // deploymentId
    DeploymentDownloadType.SOURCE, // type (optional)
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        System.out.println(result);
    })
);

