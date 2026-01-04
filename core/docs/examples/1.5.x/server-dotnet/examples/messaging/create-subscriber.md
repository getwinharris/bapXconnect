using bapXdb;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetJWT("<YOUR_JWT>"); // Your secret JSON Web Token

Messaging messaging = new Messaging(client);

Subscriber result = await messaging.CreateSubscriber(
    topicId: "<TOPIC_ID>",
    subscriberId: "<SUBSCRIBER_ID>",
    targetId: "<TARGET_ID>"
);