import bapXdb

let client = Client()
    .setEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setSession("") // The user session to authenticate with

let locale = Locale(client)

let countryList = try await locale.listCountriesEU()

