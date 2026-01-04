import { Client, Tokens } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const tokens = new Tokens(client);

const result = await tokens.delete({
    tokenId: '<TOKEN_ID>'
});

console.log(result);
