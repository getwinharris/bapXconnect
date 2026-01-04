POST /v1/messaging/topics/{topicId}/subscribers HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.6.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-JWT: <YOUR_JWT>
X-bapXdb-Session: 

{
  "subscriberId": "<SUBSCRIBER_ID>",
  "targetId": "<TARGET_ID>"
}
