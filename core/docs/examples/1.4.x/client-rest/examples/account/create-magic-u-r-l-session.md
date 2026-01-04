POST /v1/account/sessions/magic-url HTTP/1.1
Host: HOSTNAME
Content-Type: application/json
X-bapXdb-Response-Format: 1.4.0
X-bapXdb-Project: 5df5acd0d48c2

{
  "userId": "[USER_ID]",
  "email": "email@example.com",
  "url": "https://example.com"
}
