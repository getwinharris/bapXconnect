using bapXdb;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetKey("<YOUR_API_KEY>"); // Your secret API key

Messaging messaging = new Messaging(client);

Provider result = await messaging.CreateTelesignProvider(
    providerId: "<PROVIDER_ID>",
    name: "<NAME>",
    from: "+12065550100", // optional
    customerId: "<CUSTOMER_ID>", // optional
    apiKey: "<API_KEY>", // optional
    enabled: false // optional
);