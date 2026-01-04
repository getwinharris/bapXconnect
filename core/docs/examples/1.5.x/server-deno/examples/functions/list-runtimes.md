import { Client, Functions } from "https://deno.land/x/bapxdb/mod.ts";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const functions = new Functions(client);

const response = await functions.listRuntimes();
