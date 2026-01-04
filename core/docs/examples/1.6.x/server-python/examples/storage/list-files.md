from bapxdb.client import Client
from bapxdb.services.storage import Storage

client = Client()
client.set_endpoint('https://<REGION>.cloud.bapxdb.io/v1') # Your API Endpoint
client.set_project('<YOUR_PROJECT_ID>') # Your project ID
client.set_session('') # The user session to authenticate with

storage = Storage(client)

result = storage.list_files(
    bucket_id = '<BUCKET_ID>',
    queries = [], # optional
    search = '<SEARCH>' # optional
)
