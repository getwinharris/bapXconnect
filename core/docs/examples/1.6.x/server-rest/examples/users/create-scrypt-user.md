POST /v1/users/scrypt HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.6.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "userId": "<USER_ID>",
  "email": "email@example.com",
  "password": "password",
  "passwordSalt": "<PASSWORD_SALT>",
  "passwordCpu": 0,
  "passwordMemory": 0,
  "passwordParallel": 0,
  "passwordLength": 0,
  "name": "<NAME>"
}
