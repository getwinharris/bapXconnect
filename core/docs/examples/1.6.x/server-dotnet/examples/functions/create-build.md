using bapXdb;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetKey("<YOUR_API_KEY>"); // Your secret API key

Functions functions = new Functions(client);

 result = await functions.CreateBuild(
    functionId: "<FUNCTION_ID>",
    deploymentId: "<DEPLOYMENT_ID>",
    buildId: "<BUILD_ID>" // optional
);