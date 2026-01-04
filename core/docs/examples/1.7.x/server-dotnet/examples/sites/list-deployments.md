using bapXdb;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetKey("<YOUR_API_KEY>"); // Your secret API key

Sites sites = new Sites(client);

DeploymentList result = await sites.ListDeployments(
    siteId: "<SITE_ID>",
    queries: new List<string>(), // optional
    search: "<SEARCH>" // optional
);