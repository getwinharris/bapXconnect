using bapXdb;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetSession(""); // The user session to authenticate with

Functions functions = new Functions(client);

ExecutionList result = await functions.ListExecutions(
    functionId: "<FUNCTION_ID>",
    queries: new List<string>(), // optional
    search: "<SEARCH>" // optional
);