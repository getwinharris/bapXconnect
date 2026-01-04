import io.bapxdb.Client
import io.bapxdb.services.Locale

val client = Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("5df5acd0d48c2") // Your project ID

val locale = Locale(client)

val response = locale.listCurrencies()
