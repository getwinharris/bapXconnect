import io.bapxdb.Client
import io.bapxdb.services.Teams

val client = Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("5df5acd0d48c2") // Your project ID

val teams = Teams(client)

val response = teams.updateMembership(
    teamId = "[TEAM_ID]",
    membershipId = "[MEMBERSHIP_ID]",
    roles = listOf()
)
