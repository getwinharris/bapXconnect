import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import io.bapxdb.Client
import io.bapxdb.services.Teams

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val client = Client(applicationContext)
            .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
            .setProject("5df5acd0d48c2") // Your project ID

        val teams = Teams(client)

        GlobalScope.launch {
            val response = teams.create(
                teamId = "[TEAM_ID]",
                name = "[NAME]",
            )
            val json = response.body?.string()        
        }
    }
}