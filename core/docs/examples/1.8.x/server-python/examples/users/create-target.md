from bapxdb.client import Client
from bapxdb.services.users import Users
from bapxdb.enums import MessagingProviderType

client = Client()
client.set_endpoint('https://<REGION>.cloud.bapxdb.io/v1') # Your API Endpoint
client.set_project('<YOUR_PROJECT_ID>') # Your project ID
client.set_key('<YOUR_API_KEY>') # Your secret API key

users = Users(client)

result = users.create_target(
    user_id = '<USER_ID>',
    target_id = '<TARGET_ID>',
    provider_type = MessagingProviderType.EMAIL,
    identifier = '<IDENTIFIER>',
    provider_id = '<PROVIDER_ID>', # optional
    name = '<NAME>' # optional
)
