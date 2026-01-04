import { Client, Proxy, , ProxyResourceType } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const proxy = new Proxy(client);

const result = await proxy.createRedirectRule(
    '', // domain
    'https://example.com', // url
    .MovedPermanently301, // statusCode
    '<RESOURCE_ID>', // resourceId
    ProxyResourceType.Site // resourceType
);

console.log(result);
