from bapxdb.client import Client
from bapxdb.enums import AuthenticationFactor

client = Client()
client.set_endpoint('https://<REGION>.cloud.bapxdb.io/v1') # Your API Endpoint
client.set_project('5df5acd0d48c2') # Your project ID

account = Account(client)

result = account.create_challenge(
    factor = AuthenticationFactor.TOTP
)
