import io.bapxdb.Client
import io.bapxdb.coroutines.CoroutineCallback
import io.bapxdb.services.Databases
import io.bapxdb.enums.RelationshipType
import io.bapxdb.enums.RelationMutate

val client = Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>") // Your secret API key

val databases = Databases(client)

val response = databases.createRelationshipAttribute(
    databaseId = "<DATABASE_ID>",
    collectionId = "<COLLECTION_ID>",
    relatedCollectionId = "<RELATED_COLLECTION_ID>",
    type =  RelationshipType.ONETOONE,
    twoWay = false, // optional
    key = "", // optional
    twoWayKey = "", // optional
    onDelete = "cascade" // optional
)
