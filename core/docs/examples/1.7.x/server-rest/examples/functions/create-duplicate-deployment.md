POST /v1/functions/{functionId}/deployments/duplicate HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.7.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "deploymentId": "<DEPLOYMENT_ID>",
  "buildId": "<BUILD_ID>"
}
