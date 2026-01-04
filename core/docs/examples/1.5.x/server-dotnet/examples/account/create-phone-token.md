using bapXdb;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>"); // Your project ID

Account account = new Account(client);

Token result = await account.CreatePhoneToken(
    userId: "<USER_ID>",
    phone: "+12065550100"
);