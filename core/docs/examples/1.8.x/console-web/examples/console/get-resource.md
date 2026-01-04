import { Client, Console, ConsoleResourceType } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const console = new Console(client);

const result = await console.getResource({
    value: '<VALUE>',
    type: ConsoleResourceType.Rules
});

console.log(result);
