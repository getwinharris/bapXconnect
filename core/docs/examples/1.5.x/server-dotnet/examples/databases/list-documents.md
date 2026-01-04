using bapXdb;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetSession(""); // The user session to authenticate with

Databases databases = new Databases(client);

DocumentList result = await databases.ListDocuments(
    databaseId: "<DATABASE_ID>",
    collectionId: "<COLLECTION_ID>",
    queries: new List<string>() // optional
);