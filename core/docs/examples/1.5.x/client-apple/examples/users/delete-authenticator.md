import bapXdb
import bapXdbEnums

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("5df5acd0d48c2") // Your project ID

let users = Users(client)

let user = try await users.deleteAuthenticator(
    userId: "[USER_ID]",
    provider: .totp,
    otp: "[OTP]"
)

