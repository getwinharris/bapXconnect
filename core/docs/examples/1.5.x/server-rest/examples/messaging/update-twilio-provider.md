PATCH /v1/messaging/providers/twilio/{providerId} HTTP/1.1
Host: &lt;REGION&gt;.cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.6.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "name": "<NAME>",
  "enabled": false,
  "accountSid": "<ACCOUNT_SID>",
  "authToken": "<AUTH_TOKEN>",
  "from": "<FROM>"
}
