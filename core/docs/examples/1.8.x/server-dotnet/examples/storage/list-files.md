using bapXdb;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetSession(""); // The user session to authenticate with

Storage storage = new Storage(client);

FileList result = await storage.ListFiles(
    bucketId: "<BUCKET_ID>",
    queries: new List<string>(), // optional
    search: "<SEARCH>", // optional
    total: false // optional
);