using bapXdb;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>"); // Your project ID

Account account = new Account(client);

User result = await account.Create(
    userId: "<USER_ID>",
    email: "email@example.com",
    password: "",
    name: "<NAME>" // optional
);