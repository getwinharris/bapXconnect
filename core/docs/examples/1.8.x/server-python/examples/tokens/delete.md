from bapxdb.client import Client
from bapxdb.services.tokens import Tokens

client = Client()
client.set_endpoint('https://<REGION>.cloud.bapxdb.io/v1') # Your API Endpoint
client.set_project('<YOUR_PROJECT_ID>') # Your project ID
client.set_key('<YOUR_API_KEY>') # Your secret API key

tokens = Tokens(client)

result = tokens.delete(
    token_id = '<TOKEN_ID>'
)
