using bapXdb;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetSession(""); // The user session to authenticate with

Storage storage = new Storage(client);

File result = await storage.UpdateFile(
    bucketId: "<BUCKET_ID>",
    fileId: "<FILE_ID>",
    name: "<NAME>", // optional
    permissions: new List<string> { Permission.Read(Role.Any()) } // optional
);