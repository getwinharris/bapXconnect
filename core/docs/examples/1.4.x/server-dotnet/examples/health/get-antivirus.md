using bapXdb;
using bapXdb.Services;
using bapXdb.Models;

var client = new Client()
    .SetEndPoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("5df5acd0d48c2") // Your project ID
    .SetKey("919c2d18fb5d4...a2ae413da83346ad2"); // Your secret API key

var health = new Health(client);

HealthAntivirus result = await health.GetAntivirus();