import bapXdb
import bapXdbEnums

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("5df5acd0d48c2") // Your project ID

let account = Account(client)

let user = try await account.deleteAuthenticator(
    type: .totp,
    otp: "<OTP>"
)

