import bapXdb

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

let account = Account(client)

let user = try await account.updatePrefs(
    prefs: [
        "language": "en",
        "timezone": "UTC",
        "darkTheme": true
    ]
)

