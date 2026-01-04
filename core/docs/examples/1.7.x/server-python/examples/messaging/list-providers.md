from bapxdb.client import Client
from bapxdb.services.messaging import Messaging

client = Client()
client.set_endpoint('https://<REGION>.cloud.bapxdb.io/v1') # Your API Endpoint
client.set_project('<YOUR_PROJECT_ID>') # Your project ID
client.set_key('<YOUR_API_KEY>') # Your secret API key

messaging = Messaging(client)

result = messaging.list_providers(
    queries = [], # optional
    search = '<SEARCH>' # optional
)
