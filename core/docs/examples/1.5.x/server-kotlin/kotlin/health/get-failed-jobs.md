import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Health
import io.bapxdb.enums.Name

val client = Client()
    .setEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>") // Your secret API key

val health = Health(client)

val response = health.getFailedJobs(
    name =  .V1_DATABASE,
    threshold = 0 // optional
)
