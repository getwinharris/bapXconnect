import os
import json
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import List, Dict, Any

class Tools:
    def __init__(self):
        # Database connection parameters from environment or defaults
        self.db_url = os.getenv("DATABASE_URL", "postgresql://postgres:postgres_password@postgres:5432/public")

    def query_bapx_memory(self, user_id: str, query: str) -> str:
        """
        Search the user's lifetime memory context in bapXdb.
        :param user_id: The unique ID of the user.
        :param query: The search query or question.
        :return: A summary of relevant memory entries.
        """
        try:
            conn = psycopg2.connect(self.db_url, cursor_factory=RealDictCursor)
            with conn.cursor() as cur:
                # This is a conceptual query. In a real scenario, we'd use vector search or text search
                # on the user's specific memory tables.
                search_query = """
                    SELECT content, created_at 
                    FROM user_memories 
                    WHERE user_id = %s 
                    AND content ILIKE %s
                    ORDER BY created_at DESC 
                    LIMIT 5
                """
                cur.execute(search_query, (user_id, f"%{query}%"))
                results = cur.fetchall()
                
                if not results:
                    return "No relevant memories found in your bapX lifetime context."
                
                formatted_results = []
                for res in results:
                    formatted_results.append(f"[{res['created_at']}]: {res['content']}")
                
                return "\n".join(formatted_results)
        except Exception as e:
            return f"Error querying bapXdb: {str(e)}"
        finally:
            if 'conn' in locals():
                conn.close()

    def get_user_projects(self, user_id: str) -> str:
        """
        Retrieve a list of the user's active projects from bapXdb.
        """
        try:
            conn = psycopg2.connect(self.db_url, cursor_factory=RealDictCursor)
            with conn.cursor() as cur:
                cur.execute("SELECT name, status FROM projects WHERE user_id = %s", (user_id,))
                projects = cur.fetchall()
                
                if not projects:
                    return "You have no active projects in bapX."
                
                return json.dumps(projects, indent=2)
        except Exception as e:
            return f"Error retrieving projects: {str(e)}"
        finally:
            if 'conn' in locals():
                conn.close()

# Instructions for Open WebUI:
# 1. Go to Workspace > Tools
# 2. Click "Create Tool"
# 3. Paste the content of this script (class Tools)
# 4. Save and enable for your model.
