import { Client, Functions, FunctionUsageRange } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const functions = new Functions(client);

const result = await functions.getUsage(
    '<FUNCTION_ID>', // functionId
    FunctionUsageRange.TwentyFourHours // range (optional)
);

console.log(result);
