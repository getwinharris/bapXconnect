POST /v1/messaging/messages/email HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.8.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "messageId": "<MESSAGE_ID>",
  "subject": "<SUBJECT>",
  "content": "<CONTENT>",
  "topics": [],
  "users": [],
  "targets": [],
  "cc": [],
  "bcc": [],
  "attachments": [],
  "draft": false,
  "html": false,
  "scheduledAt": ""
}
