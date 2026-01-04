POST /v1/messaging/providers/apns HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.8.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "providerId": "<PROVIDER_ID>",
  "name": "<NAME>",
  "authKey": "<AUTH_KEY>",
  "authKeyId": "<AUTH_KEY_ID>",
  "teamId": "<TEAM_ID>",
  "bundleId": "<BUNDLE_ID>",
  "sandbox": false,
  "enabled": false
}
