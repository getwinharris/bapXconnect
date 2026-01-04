import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Teams

val client = Client()
    .setEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setSession("") // The user session to authenticate with

val teams = Teams(client)

val response = teams.updateMembership(
    teamId = "<TEAM_ID>",
    membershipId = "<MEMBERSHIP_ID>",
    roles = listOf()
)
