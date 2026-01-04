POST /v1/functions/{functionId}/executions HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.8.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Session: 
X-bapXdb-JWT: <YOUR_JWT>

{
  "body": "<BODY>",
  "async": false,
  "path": "<PATH>",
  "method": "GET",
  "headers": {},
  "scheduledAt": "<SCHEDULED_AT>"
}
