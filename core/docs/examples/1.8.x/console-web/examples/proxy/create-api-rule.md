import { Client, Proxy } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const proxy = new Proxy(client);

const result = await proxy.createAPIRule({
    domain: ''
});

console.log(result);
