import { Client, Functions } from "react-native-bapxdb";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const functions = new Functions(client);

const result = await functions.getExecution(
    '<FUNCTION_ID>', // functionId
    '<EXECUTION_ID>' // executionId
);

console.log(result);
