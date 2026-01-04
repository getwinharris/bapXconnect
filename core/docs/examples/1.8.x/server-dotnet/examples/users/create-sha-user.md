using bapXdb;
using bapXdb.Enums;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetKey("<YOUR_API_KEY>"); // Your secret API key

Users users = new Users(client);

User result = await users.CreateSHAUser(
    userId: "<USER_ID>",
    email: "email@example.com",
    password: "password",
    passwordVersion: PasswordHash.Sha1, // optional
    name: "<NAME>" // optional
);