using bapXdb;
using bapXdb.Enums;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetKey("<YOUR_API_KEY>"); // Your secret API key

Functions functions = new Functions(client);

Function result = await functions.Update(
    functionId: "<FUNCTION_ID>",
    name: "<NAME>",
    runtime: .Node145, // optional
    execute: ["any"], // optional
    events: new List<string>(), // optional
    schedule: "", // optional
    timeout: 1, // optional
    enabled: false, // optional
    logging: false, // optional
    entrypoint: "<ENTRYPOINT>", // optional
    commands: "<COMMANDS>", // optional
    scopes: new List<string>(), // optional
    installationId: "<INSTALLATION_ID>", // optional
    providerRepositoryId: "<PROVIDER_REPOSITORY_ID>", // optional
    providerBranch: "<PROVIDER_BRANCH>", // optional
    providerSilentMode: false, // optional
    providerRootDirectory: "<PROVIDER_ROOT_DIRECTORY>", // optional
    specification: "" // optional
);