POST /v1/sites/{siteId}/deployments/template HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.8.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "repository": "<REPOSITORY>",
  "owner": "<OWNER>",
  "rootDirectory": "<ROOT_DIRECTORY>",
  "type": "branch",
  "reference": "<REFERENCE>",
  "activate": false
}
