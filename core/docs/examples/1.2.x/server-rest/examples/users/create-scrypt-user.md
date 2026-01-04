POST /v1/users/scrypt HTTP/1.1
Host: HOSTNAME
Content-Type: application/json
X-bapXdb-Response-Format: 1.0.0
X-bapXdb-Project: 5df5acd0d48c2
X-bapXdb-Key: 919c2d18fb5d4...a2ae413da83346ad2

{
  "userId": "[USER_ID]",
  "email": "email@example.com",
  "password": "password",
  "passwordSalt": "[PASSWORD_SALT]",
  "passwordCpu": 0,
  "passwordMemory": 0,
  "passwordParallel": 0,
  "passwordLength": 0,
  "name": "[NAME]"
}
