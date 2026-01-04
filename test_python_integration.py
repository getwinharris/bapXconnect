import os
import sys
from dotenv import load_dotenv

# Mock env for testing
os.environ["_APP_DB_HOST"] = "localhost"
os.environ["_APP_DB_PORT"] = "5432"
os.environ["_APP_DB_USER"] = "postgres"
os.environ["_APP_DB_PASS"] = "password"
os.environ["_APP_DB_SCHEMA"] = "bapx"

try:
    from storage.manager import BapxStorageManager
    from compute.engine import BapxComputeEngine
except ImportError as e:
    print(f"Import failed: {e}")
    print("Make sure you are running from the project root.")
    sys.exit(1)

def test_integration():
    print("Testing BAPX Python Integration with PostgreSQL...")
    
    mgr = BapxStorageManager()
    
    # 1. Test compression
    data = b"Testing Python PostgreSQL integration for BAPX scalar field."
    print(f"\n1. Testing Compression for: {data}")
    scalar = BapxComputeEngine.compress(data)
    print(f"Scalar bytes: {scalar.hex()}")
    
    # 2. Test storage (This requires a running PostgreSQL)
    print("\n2. Testing Storage in PostgreSQL (Schema: project_1):")
    try:
        metadata = mgr.store_file("test_file.txt", data, project_id="1")
        print(f"Metadata: {metadata}")
        
        # 3. Test listing
        print("\n3. Testing Listing:")
        files = mgr.list_files(project_id="1")
        print(f"Files found: {len(files)}")
        for f in files:
            print(f" - {f['id']} (Size: {f['sz']}, Scalar: {f['b']})")
            
        # 4. Test retrieval
        print("\n4. Testing Retrieval:")
        restored = mgr.retrieve_file("test_file.txt", project_id="1")
        print(f"Restored data: {restored}")
        
        if restored == data:
            print("\nSUCCESS: Data integrity verified through PostgreSQL manifold!")
        else:
            print("\nFAILURE: Data mismatch during restoration.")
            
    except Exception as e:
        print(f"Database operation failed: {e}")
        print("Note: This test requires a running PostgreSQL instance at localhost:5432.")

if __name__ == "__main__":
    test_integration()
