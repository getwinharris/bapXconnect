import bapXdb

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("5df5acd0d48c2") // Your project ID

let teams = Teams(client)

let membership = try await teams.createMembership(
    teamId: "[TEAM_ID]",
    email: "email@example.com",
    roles: [],
    url: "https://example.com"
)

