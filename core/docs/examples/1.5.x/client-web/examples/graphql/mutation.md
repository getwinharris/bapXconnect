import { Client, Graphql } from "bapxdb";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const graphql = new Graphql(client);

const result = await graphql.mutation(
    {} // query
);

console.log(result);
