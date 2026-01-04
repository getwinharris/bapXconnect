import bapXdb

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("5df5acd0d48c2") // Your project ID

let users = Users(client)

let mfaProviders = try await users.listProviders(
    userId: "[USER_ID]"
)

