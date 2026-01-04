POST /v1/messaging/providers/msg91 HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.6.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "providerId": "<PROVIDER_ID>",
  "name": "<NAME>",
  "templateId": "<TEMPLATE_ID>",
  "senderId": "<SENDER_ID>",
  "authKey": "<AUTH_KEY>",
  "enabled": false
}
