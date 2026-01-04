import { Client, Locale } from "https://deno.land/x/bapxdb/mod.ts";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

const locale = new Locale(client);

const response = await locale.get();
