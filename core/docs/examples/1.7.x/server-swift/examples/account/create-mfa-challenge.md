import bapXdb
import bapXdbEnums

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

let account = Account(client)

let mfaChallenge = try await account.createMfaChallenge(
    factor: .email
)

