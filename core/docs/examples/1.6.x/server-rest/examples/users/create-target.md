POST /v1/users/{userId}/targets HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.6.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "targetId": "<TARGET_ID>",
  "providerType": "email",
  "identifier": "<IDENTIFIER>",
  "providerId": "<PROVIDER_ID>",
  "name": "<NAME>"
}
