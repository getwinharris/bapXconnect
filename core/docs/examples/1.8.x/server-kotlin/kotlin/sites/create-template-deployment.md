import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Sites
import io.bapxdb.enums.TemplateReferenceType

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>") // Your secret API key

val sites = Sites(client)

val response = sites.createTemplateDeployment(
    siteId = "<SITE_ID>",
    repository = "<REPOSITORY>",
    owner = "<OWNER>",
    rootDirectory = "<ROOT_DIRECTORY>",
    type =  TemplateReferenceType.BRANCH,
    reference = "<REFERENCE>",
    activate = false // optional
)
