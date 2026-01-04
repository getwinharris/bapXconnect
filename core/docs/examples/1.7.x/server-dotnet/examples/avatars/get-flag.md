using bapXdb;
using bapXdb.Enums;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetSession(""); // The user session to authenticate with

Avatars avatars = new Avatars(client);

byte[] result = await avatars.GetFlag(
    code: Flag.Afghanistan,
    width: 0, // optional
    height: 0, // optional
    quality: -1 // optional
);