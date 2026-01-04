using bapXdb;
using bapXdb.Enums;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetKey("<YOUR_API_KEY>"); // Your secret API key

Sites sites = new Sites(client);

Deployment result = await sites.CreateTemplateDeployment(
    siteId: "<SITE_ID>",
    repository: "<REPOSITORY>",
    owner: "<OWNER>",
    rootDirectory: "<ROOT_DIRECTORY>",
    type: TemplateReferenceType.Branch,
    reference: "<REFERENCE>",
    activate: false // optional
);