from bapxdb.client import Client
from bapxdb.services.sites import Sites
from bapxdb.enums import TemplateReferenceType

client = Client()
client.set_endpoint('https://<REGION>.cloud.bapxdb.io/v1') # Your API Endpoint
client.set_project('<YOUR_PROJECT_ID>') # Your project ID
client.set_key('<YOUR_API_KEY>') # Your secret API key

sites = Sites(client)

result = sites.create_template_deployment(
    site_id = '<SITE_ID>',
    repository = '<REPOSITORY>',
    owner = '<OWNER>',
    root_directory = '<ROOT_DIRECTORY>',
    type = TemplateReferenceType.BRANCH,
    reference = '<REFERENCE>',
    activate = False # optional
)
