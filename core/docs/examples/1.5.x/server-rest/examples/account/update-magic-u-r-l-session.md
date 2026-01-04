PUT /v1/account/sessions/magic-url HTTP/1.1
Host: &lt;REGION&gt;.cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.6.0
X-bapXdb-Project: <YOUR_PROJECT_ID>

{
  "userId": "<USER_ID>",
  "secret": "<SECRET>"
}
