POST /v1/messaging/messages/push HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.7.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "messageId": "<MESSAGE_ID>",
  "title": "<TITLE>",
  "body": "<BODY>",
  "topics": [],
  "users": [],
  "targets": [],
  "data": {},
  "action": "<ACTION>",
  "image": "[ID1:ID2]",
  "icon": "<ICON>",
  "sound": "<SOUND>",
  "color": "<COLOR>",
  "tag": "<TAG>",
  "badge": 0,
  "draft": false,
  "scheduledAt": ,
  "contentAvailable": false,
  "critical": false,
  "priority": "normal"
}
