using bapXdb;
using bapXdb.Enums;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("5df5acd0d48c2"); // Your project ID

Account account = new Account(client);

MfaChallenge result = await account.CreateChallenge(
    factor: AuthenticationFactor.Totp
);