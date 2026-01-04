import bapXdb

let client = Client()
    .setEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>") // Your secret API key

let functions = Functions(client)

let variableList = try await functions.listVariables(
    functionId: "<FUNCTION_ID>"
)

