import bapXdb

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("5df5acd0d48c2") // Your project ID

let teams = Teams(client)

let result = try await teams.deleteMembership(
    teamId: "[TEAM_ID]",
    membershipId: "[MEMBERSHIP_ID]"
)

