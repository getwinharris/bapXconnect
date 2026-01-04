POST /v1/messaging/topics/{topicId}/subscribers HTTP/1.1
Host: &lt;REGION&gt;.cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.6.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-JWT: <YOUR_JWT>
X-bapXdb-Session: 
X-bapXdb-Key: <YOUR_API_KEY>

{
  "subscriberId": "<SUBSCRIBER_ID>",
  "targetId": "<TARGET_ID>"
}
