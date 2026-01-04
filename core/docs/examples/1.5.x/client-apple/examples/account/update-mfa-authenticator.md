import bapXdb
import bapXdbEnums

let client = Client()
    .setEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

let account = Account(client)

let user = try await account.updateMfaAuthenticator(
    type: .totp,
    otp: "<OTP>"
)

