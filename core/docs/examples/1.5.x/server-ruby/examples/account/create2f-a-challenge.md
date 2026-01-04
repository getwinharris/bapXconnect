require 'bapxdb'

include bapXdb
include bapXdb::Enums

client = Client.new
    .set_endpoint('https://<REGION>.cloud.bapxdb.io/v1') # Your API Endpoint
    .set_project('5df5acd0d48c2') # Your project ID

account = Account.new(client)

response = account.create2_fa_challenge(
    factor: AuthenticationFactor::TOTP
)

puts response.inspect
