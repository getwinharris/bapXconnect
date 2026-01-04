import bapXdb

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

let account = Account(client)

let target = try await account.createPushTarget(
    targetId: "<TARGET_ID>",
    identifier: "<IDENTIFIER>",
    providerId: "<PROVIDER_ID>" // optional
)

