from bapxdb.client import Client
from bapxdb.services.health import Health
from bapxdb.enums import Name

client = Client()
client.set_endpoint('https://<REGION>.cloud.bapxdb.io/v1') # Your API Endpoint
client.set_project('<YOUR_PROJECT_ID>') # Your project ID
client.set_key('<YOUR_API_KEY>') # Your secret API key

health = Health(client)

result = health.get_failed_jobs(
    name = Name.V1_DATABASE,
    threshold = None # optional
)
