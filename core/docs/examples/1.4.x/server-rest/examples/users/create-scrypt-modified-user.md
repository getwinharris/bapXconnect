POST /v1/users/scrypt-modified HTTP/1.1
Host: HOSTNAME
Content-Type: application/json
X-bapXdb-Response-Format: 1.4.0
X-bapXdb-Project: 5df5acd0d48c2
X-bapXdb-Key: 919c2d18fb5d4...a2ae413da83346ad2

{
  "userId": "[USER_ID]",
  "email": "email@example.com",
  "password": "password",
  "passwordSalt": "[PASSWORD_SALT]",
  "passwordSaltSeparator": "[PASSWORD_SALT_SEPARATOR]",
  "passwordSignerKey": "[PASSWORD_SIGNER_KEY]",
  "name": "[NAME]"
}
