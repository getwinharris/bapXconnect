using bapXdb;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetSession(""); // The user session to authenticate with

Teams teams = new Teams(client);

Team result = await teams.Create(
    teamId: "<TEAM_ID>",
    name: "<NAME>",
    roles: new List<string>() // optional
);