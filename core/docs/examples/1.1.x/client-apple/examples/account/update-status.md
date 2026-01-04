import bapXdb

func main() async throws {
    let client = Client()
      .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
      .setProject("5df5acd0d48c2") // Your project ID
    let account = Account(client)
    let account = try await account.updateStatus()

    print(String(describing: account)
}
