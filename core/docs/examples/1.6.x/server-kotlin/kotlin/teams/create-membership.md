import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Teams

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setSession("") // The user session to authenticate with

val teams = Teams(client)

val response = teams.createMembership(
    teamId = "<TEAM_ID>",
    roles = listOf(),
    email = "email@example.com", // optional
    userId = "<USER_ID>", // optional
    phone = "+12065550100", // optional
    url = "https://example.com", // optional
    name = "<NAME>" // optional
)
