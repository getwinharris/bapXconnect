POST /v1/account/targets/push HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.8.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Session: 

{
  "targetId": "<TARGET_ID>",
  "identifier": "<IDENTIFIER>",
  "providerId": "<PROVIDER_ID>"
}
