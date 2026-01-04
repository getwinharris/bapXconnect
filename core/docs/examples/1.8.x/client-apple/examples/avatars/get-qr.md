import bapXdb

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

let avatars = Avatars(client)

let bytes = try await avatars.getQR(
    text: "<TEXT>",
    size: 1, // optional
    margin: 0, // optional
    download: false // optional
)

