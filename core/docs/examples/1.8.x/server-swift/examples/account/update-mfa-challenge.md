import bapXdb

let client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setSession("") // The user session to authenticate with

let account = Account(client)

let session = try await account.updateMFAChallenge(
    challengeId: "<CHALLENGE_ID>",
    otp: "<OTP>"
)

