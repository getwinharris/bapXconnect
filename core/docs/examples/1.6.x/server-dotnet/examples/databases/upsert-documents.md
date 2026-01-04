using bapXdb;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetKey("<YOUR_API_KEY>"); // Your secret API key

Databases databases = new Databases(client);

DocumentList result = await databases.UpsertDocuments(
    databaseId: "<DATABASE_ID>",
    collectionId: "<COLLECTION_ID>",
    documents: new List<object>() // optional
);