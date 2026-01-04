import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Sites
import io.bapxdb.enums.DeploymentDownloadType

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>") // Your secret API key

val sites = Sites(client)

val result = sites.getDeploymentDownload(
    siteId = "<SITE_ID>",
    deploymentId = "<DEPLOYMENT_ID>",
    type = "source" // optional
)
