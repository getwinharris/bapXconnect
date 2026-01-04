using bapXdb;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetSession(""); // The user session to authenticate with

Functions functions = new Functions(client);

Execution result = await functions.GetExecution(
    functionId: "<FUNCTION_ID>",
    executionId: "<EXECUTION_ID>"
);