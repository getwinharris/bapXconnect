PUT /v1/account/recovery HTTP/1.1
Host: HOSTNAME
Content-Type: application/json
X-bapXdb-Response-Format: 1.0.0
X-bapXdb-Project: 5df5acd0d48c2
X-bapXdb-JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...

{
  "userId": "[USER_ID]",
  "secret": "[SECRET]",
  "password": "password",
  "passwordAgain": "password"
}
