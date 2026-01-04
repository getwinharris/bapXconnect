from bapxdb.client import Client
from bapxdb.services.databases import Databases

client = Client()
client.set_endpoint('https://<REGION>.cloud.bapxdb.io/v1') # Your API Endpoint
client.set_project('<YOUR_PROJECT_ID>') # Your project ID
client.set_key('<YOUR_API_KEY>') # Your secret API key

databases = Databases(client)

result = databases.create_collection(
    database_id = '<DATABASE_ID>',
    collection_id = '<COLLECTION_ID>',
    name = '<NAME>',
    permissions = ["read("any")"], # optional
    document_security = False, # optional
    enabled = False # optional
)
