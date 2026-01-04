import { Client, Messaging } from "react-native-bapxdb";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const messaging = new Messaging(client);

const result = await messaging.deleteSubscriber(
    '<TOPIC_ID>', // topicId
    '<SUBSCRIBER_ID>' // subscriberId
);

console.log(result);
