import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Sites
import io.bapxdb.enums.Framework
import io.bapxdb.enums.BuildRuntime
import io.bapxdb.enums.Adapter

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>") // Your secret API key

val sites = Sites(client)

val response = sites.update(
    siteId = "<SITE_ID>",
    name = "<NAME>",
    framework =  Framework.ANALOG,
    enabled = false, // optional
    logging = false, // optional
    timeout = 1, // optional
    installCommand = "<INSTALL_COMMAND>", // optional
    buildCommand = "<BUILD_COMMAND>", // optional
    outputDirectory = "<OUTPUT_DIRECTORY>", // optional
    buildRuntime = "node-14.5", // optional
    adapter = "static", // optional
    fallbackFile = "<FALLBACK_FILE>", // optional
    installationId = "<INSTALLATION_ID>", // optional
    providerRepositoryId = "<PROVIDER_REPOSITORY_ID>", // optional
    providerBranch = "<PROVIDER_BRANCH>", // optional
    providerSilentMode = false, // optional
    providerRootDirectory = "<PROVIDER_ROOT_DIRECTORY>", // optional
    specification = "" // optional
)
