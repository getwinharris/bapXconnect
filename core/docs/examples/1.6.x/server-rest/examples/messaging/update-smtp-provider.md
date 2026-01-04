PATCH /v1/messaging/providers/smtp/{providerId} HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.6.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "name": "<NAME>",
  "host": "<HOST>",
  "port": 1,
  "username": "<USERNAME>",
  "password": "<PASSWORD>",
  "encryption": "none",
  "autoTLS": false,
  "mailer": "<MAILER>",
  "fromName": "<FROM_NAME>",
  "fromEmail": "email@example.com",
  "replyToName": "<REPLY_TO_NAME>",
  "replyToEmail": "<REPLY_TO_EMAIL>",
  "enabled": false
}
