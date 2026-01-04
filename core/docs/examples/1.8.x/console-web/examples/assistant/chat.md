import { Client, Assistant } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const assistant = new Assistant(client);

const result = await assistant.chat({
    prompt: '<PROMPT>'
});

console.log(result);
