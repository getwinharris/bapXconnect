import bapXdb
import bapXdbEnums

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

let account = Account(client)

let success = try await account.createOAuth2Token(
    provider: .amazon,
    success: "https://example.com", // optional
    failure: "https://example.com", // optional
    scopes: [] // optional
)

