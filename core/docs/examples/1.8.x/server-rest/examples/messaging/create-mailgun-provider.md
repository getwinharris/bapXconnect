POST /v1/messaging/providers/mailgun HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.8.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "providerId": "<PROVIDER_ID>",
  "name": "<NAME>",
  "apiKey": "<API_KEY>",
  "domain": "<DOMAIN>",
  "isEuRegion": false,
  "fromName": "<FROM_NAME>",
  "fromEmail": "email@example.com",
  "replyToName": "<REPLY_TO_NAME>",
  "replyToEmail": "email@example.com",
  "enabled": false
}
