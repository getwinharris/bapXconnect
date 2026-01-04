import bapXdb

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("5df5acd0d48c2") // Your project ID

let account = Account(client)

let token = try await account.updatePhoneVerification(
    userId: "[USER_ID]",
    secret: "[SECRET]"
)

