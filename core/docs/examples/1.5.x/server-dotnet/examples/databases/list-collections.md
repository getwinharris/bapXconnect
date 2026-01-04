using bapXdb;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetKey("<YOUR_API_KEY>"); // Your secret API key

Databases databases = new Databases(client);

CollectionList result = await databases.ListCollections(
    databaseId: "<DATABASE_ID>",
    queries: new List<string>(), // optional
    search: "<SEARCH>" // optional
);