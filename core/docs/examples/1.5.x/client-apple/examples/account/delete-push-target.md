import bapXdb

let client = Client()
    .setEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

let account = Account(client)

let result = try await account.deletePushTarget(
    targetId: "<TARGET_ID>"
)

