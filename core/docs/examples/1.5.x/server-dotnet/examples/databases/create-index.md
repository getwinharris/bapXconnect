using bapXdb;
using bapXdb.Enums;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetKey("<YOUR_API_KEY>"); // Your secret API key

Databases databases = new Databases(client);

Index result = await databases.CreateIndex(
    databaseId: "<DATABASE_ID>",
    collectionId: "<COLLECTION_ID>",
    key: "",
    type: IndexType.Key,
    attributes: new List<string>(),
    orders: new List<string>() // optional
);