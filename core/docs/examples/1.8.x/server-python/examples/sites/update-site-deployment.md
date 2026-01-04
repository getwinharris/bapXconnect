from bapxdb.client import Client
from bapxdb.services.sites import Sites

client = Client()
client.set_endpoint('https://<REGION>.cloud.bapxdb.io/v1') # Your API Endpoint
client.set_project('<YOUR_PROJECT_ID>') # Your project ID
client.set_key('<YOUR_API_KEY>') # Your secret API key

sites = Sites(client)

result = sites.update_site_deployment(
    site_id = '<SITE_ID>',
    deployment_id = '<DEPLOYMENT_ID>'
)
