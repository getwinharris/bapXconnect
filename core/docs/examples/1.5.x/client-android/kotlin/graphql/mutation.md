import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Graphql

val client = Client(context)
    .setEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

val graphql = Graphql(client)

val result = graphql.mutation(
    query = mapOf( "a" to "b" ), 
)