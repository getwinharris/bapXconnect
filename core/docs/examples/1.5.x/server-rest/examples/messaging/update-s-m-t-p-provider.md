PATCH /v1/messaging/providers/smtp/{providerId} HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.5.0
X-bapXdb-Project: 5df5acd0d48c2
X-bapXdb-Key: 919c2d18fb5d4...a2ae413da83346ad2

{
  "name": "[NAME]",
  "host": "[HOST]",
  "port": 1,
  "username": "[USERNAME]",
  "password": "[PASSWORD]",
  "encryption": "none",
  "autoTLS": false,
  "mailer": "[MAILER]",
  "fromName": "[FROM_NAME]",
  "fromEmail": "email@example.com",
  "replyToName": "[REPLY_TO_NAME]",
  "replyToEmail": "[REPLY_TO_EMAIL]",
  "enabled": false
}
