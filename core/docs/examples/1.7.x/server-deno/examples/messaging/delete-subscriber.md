import { Client, Messaging } from "https://deno.land/x/bapxdb/mod.ts";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setJWT('<YOUR_JWT>'); // Your secret JSON Web Token

const messaging = new Messaging(client);

const response = await messaging.deleteSubscriber(
    '<TOPIC_ID>', // topicId
    '<SUBSCRIBER_ID>' // subscriberId
);
