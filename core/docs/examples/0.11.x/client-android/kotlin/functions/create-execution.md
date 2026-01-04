import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import io.bapxdb.Client
import io.bapxdb.services.Functions

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val client = Client(applicationContext)
            .setEndpoint("https://[HOSTNAME_OR_IP]/v1") // Your API Endpoint
            .setProject("5df5acd0d48c2") // Your project ID

        val functions = Functions(client)

        GlobalScope.launch {
            val response = functions.createExecution(
                functionId = "[FUNCTION_ID]",
            )
            val json = response.body?.string()        
        }
    }
}