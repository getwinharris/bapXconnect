import io.bapxdb.Client
import io.bapxdb.services.Account

val client = Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("5df5acd0d48c2") // Your project ID

val account = Account(client)

val response = account.create(
    userId = "[USER_ID]",
    email = "email@example.com",
    password = "password",
)
