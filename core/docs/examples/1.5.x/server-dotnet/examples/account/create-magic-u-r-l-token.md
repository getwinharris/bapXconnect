using bapXdb;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>"); // Your project ID

Account account = new Account(client);

Token result = await account.CreateMagicURLToken(
    userId: "<USER_ID>",
    email: "email@example.com",
    url: "https://example.com", // optional
    phrase: false // optional
);