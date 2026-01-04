import os
import json
import struct
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime
from compute.engine import BapxComputeEngine
from dotenv import load_dotenv

load_dotenv()

class BapxStorageManager:
    def __init__(self):
        self.db_host = os.getenv("_APP_DB_HOST", "postgres")
        self.db_port = os.getenv("_APP_DB_PORT", "5432")
        self.db_user = os.getenv("_APP_DB_USER", "postgres")
        self.db_pass = os.getenv("_APP_DB_PASS", "password")
        self.db_name = os.getenv("_APP_DB_SCHEMA", "bapx")
        self._init_db()

    def _get_conn(self, schema="public"):
        conn = psycopg2.connect(
            host=self.db_host,
            port=self.db_port,
            user=self.db_user,
            password=self.db_pass,
            dbname=self.db_name,
            options=f"-c search_path={schema},public"
        )
        return conn

    def _init_db(self):
        # Ensure the base table exists in public schema if needed
        # But mostly we use project-specific schemas
        pass

    def _get_project_schema(self, project_id: str):
        # Map project_id to schema name (e.g. project_1)
        # For simplicity in this mock-up, we assume project_id is already the sequence or mapped
        if "_" in project_id:
            return f"project_{project_id.split('_')[-1]}"
        return f"project_{project_id}"

    def store_file(self, filename: str, data: bytes, project_id: str = "1"):
        """
        BAPX GROUND TRUTH: Stores data as a single 8-byte Binary Object in PostgreSQL.
        """
        schema = self._get_project_schema(project_id)
        scalar_bytes = BapxComputeEngine.compress(data)
        
        conn = self._get_conn(schema)
        try:
            with conn.cursor() as cur:
                # Ensure table exists in schema
                cur.execute(f"""
                    CREATE TABLE IF NOT EXISTS bapx_identity (
                        id SERIAL PRIMARY KEY,
                        path TEXT UNIQUE,
                        scalar BYTEA,
                        size INTEGER,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                """)
                
                cur.execute(f"""
                    INSERT INTO bapx_identity (path, scalar, size)
                    VALUES (%s, %s, %s)
                    ON CONFLICT (path) DO UPDATE SET scalar = EXCLUDED.scalar, size = EXCLUDED.size
                """, (filename, scalar_bytes, len(data)))
                conn.commit()
                
                return {
                    "id": filename,
                    "sz": len(data),
                    "b": scalar_bytes.hex(),
                    "ts": datetime.now().isoformat()
                }
        finally:
            conn.close()

    def retrieve_file(self, filename: str, project_id: str = "1"):
        """
        BAPX IDENTITY RESTORATION: Reverses the scalar identity on the fly.
        """
        schema = self._get_project_schema(project_id)
        conn = self._get_conn(schema)
        try:
            with conn.cursor() as cur:
                cur.execute("SELECT scalar FROM bapx_identity WHERE path = %s", (filename,))
                row = cur.fetchone()
                if not row:
                    return None
                scalar_bytes = row[0]
                return BapxComputeEngine.decompress(scalar_bytes)
        finally:
            conn.close()

    def list_files(self, project_id: str = "1"):
        schema = self._get_project_schema(project_id)
        conn = self._get_conn(schema)
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT path as id, size as sz, scalar, created_at as ts FROM bapx_identity")
                rows = cur.fetchall()
                for row in rows:
                    row['b'] = row['scalar'].tobytes().hex() if hasattr(row['scalar'], 'tobytes') else row['scalar'].hex()
                    row['ts'] = row['ts'].isoformat()
                    del row['scalar']
                return rows
        except Exception:
            return []
        finally:
            conn.close()
