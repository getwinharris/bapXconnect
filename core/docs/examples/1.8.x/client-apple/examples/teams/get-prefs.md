import bapXdb

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

let teams = Teams(client)

let preferences = try await teams.getPrefs(
    teamId: "<TEAM_ID>"
)

