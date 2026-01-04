from bapxdb.client import Client
from bapxdb.enums import AuthenticatorType

client = Client()
client.set_endpoint('https://<REGION>.cloud.bapxdb.io/v1') # Your API Endpoint
client.set_project('5df5acd0d48c2') # Your project ID
client.set_session('') # The user session to authenticate with

account = Account(client)

result = account.add_authenticator(
    type = AuthenticatorType.TOTP
)
