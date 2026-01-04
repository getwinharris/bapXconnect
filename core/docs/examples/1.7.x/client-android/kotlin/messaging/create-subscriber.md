import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Messaging

val client = Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID

val messaging = Messaging(client)

val result = messaging.createSubscriber(
    topicId = "<TOPIC_ID>", 
    subscriberId = "<SUBSCRIBER_ID>", 
    targetId = "<TARGET_ID>", 
)