import { Client, Functions } from "https://deno.land/x/bapxdb/mod.ts";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

const functions = new Functions(client);

const response = await functions.getExecution(
    '<FUNCTION_ID>', // functionId
    '<EXECUTION_ID>' // executionId
);
