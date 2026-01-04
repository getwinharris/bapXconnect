PATCH /v1/messaging/providers/sendgrid/{providerId} HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.7.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "name": "<NAME>",
  "enabled": false,
  "apiKey": "<API_KEY>",
  "fromName": "<FROM_NAME>",
  "fromEmail": "email@example.com",
  "replyToName": "<REPLY_TO_NAME>",
  "replyToEmail": "<REPLY_TO_EMAIL>"
}
