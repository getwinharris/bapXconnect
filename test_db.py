import psycopg2
try:
    conn = psycopg2.connect(
        host="localhost",
        port=5432,
        user="postgres",
        password="postgres_password",
        dbname="public"
    )
    print("Connection successful")
    conn.close()
except Exception as e:
    print(f"Connection failed: {e}")
