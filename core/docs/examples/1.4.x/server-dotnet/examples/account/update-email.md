using bapXdb;
using bapXdb.Services;
using bapXdb.Models;

var client = new Client()
    .SetEndPoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("5df5acd0d48c2") // Your project ID
    .SetJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ..."); // Your secret JSON Web Token

var account = new Account(client);

User result = await account.UpdateEmail(
    email: "email@example.com",
    password: "password");