POST /v1/account/tokens/phone HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.8.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Session: 
X-bapXdb-JWT: <YOUR_JWT>

{
  "userId": "<USER_ID>",
  "phone": "+12065550100"
}
