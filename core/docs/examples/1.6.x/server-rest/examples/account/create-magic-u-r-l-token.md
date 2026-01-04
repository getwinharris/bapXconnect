POST /v1/account/tokens/magic-url HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.6.0
X-bapXdb-Project: <YOUR_PROJECT_ID>

{
  "userId": "<USER_ID>",
  "email": "email@example.com",
  "url": "https://example.com",
  "phrase": false
}
