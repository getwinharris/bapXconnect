from bapxdb.client import Client
from bapxdb.services.messaging import Messaging

client = Client()
client.set_endpoint('https://cloud.bapxdb.io/v1') # Your API Endpoint
client.set_project('<YOUR_PROJECT_ID>') # Your project ID
client.set_key('<YOUR_API_KEY>') # Your secret API key

messaging = Messaging(client)

result = messaging.update_msg91_provider(
    provider_id = '<PROVIDER_ID>',
    name = '<NAME>', # optional
    enabled = False, # optional
    template_id = '<TEMPLATE_ID>', # optional
    sender_id = '<SENDER_ID>', # optional
    auth_key = '<AUTH_KEY>' # optional
)
