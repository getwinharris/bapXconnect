require 'bapxdb'

include bapXdb
include bapXdb::Enums

client = Client.new
    .set_endpoint('https://<REGION>.cloud.bapxdb.io/v1') # Your API Endpoint
    .set_project('<YOUR_PROJECT_ID>') # Your project ID

account = Account.new(client)

result = account.create_mfa_challenge(
    factor: AuthenticationFactor::EMAIL
)
