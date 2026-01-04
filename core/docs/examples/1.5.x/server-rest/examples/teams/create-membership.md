POST /v1/teams/{teamId}/memberships HTTP/1.1
Host: &lt;REGION&gt;.cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.6.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Session: 
X-bapXdb-Key: <YOUR_API_KEY>
X-bapXdb-JWT: <YOUR_JWT>

{
  "email": "email@example.com",
  "userId": "<USER_ID>",
  "phone": "+12065550100",
  "roles": [],
  "url": "https://example.com",
  "name": "<NAME>"
}
