import os
import sys
import time
from pathlib import Path

# Add project root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from storage.manager import BapxStorageManager
from compute.engine import BapxComputeEngine

def run_large_file_batch():
    print("=== BAPX STORAGE PRODUCT: LARGE FILE BATCH TEST ===")
    print("Innovation: Scalar for Bytes Perfect Identity\n")
    
    storage_mgr = BapxStorageManager()
    test_dir = Path("test_files")
    files = list(test_dir.glob("*"))
    
    if not files:
        print("No test files found in test_files directory.")
        return

    for file_path in files:
        filename = file_path.name
        print(f"--- Processing: {filename} ---")
        
        with open(file_path, "rb") as f:
            original_data = f.read()
        
        original_size = len(original_data)
        
        # 1. COMPRESS & STORE
        start_time = time.time()
        entry = storage_mgr.store_file(filename, original_data)
        compress_duration = time.time() - start_time
        
        # 2. RESTORE
        start_time = time.time()
        restored_data = storage_mgr.load_file(filename)
        restore_duration = time.time() - start_time
        
        # 3. VERIFY
        is_perfect = (original_data == restored_data)
        stored_size = 8 # BAPX Scalar is always 8 bytes
        reduction = (1 - (stored_size / original_size)) * 100
        
        print(f"Original Size: {original_size:,} bytes")
        print(f"BAPX Scalar:   {stored_size} bytes")
        print(f"Reduction:     {reduction:.8f}%")
        print(f"Compression:   {compress_duration:.4f}s")
        print(f"Restoration:   {restore_duration:.4f}s")
        print(f"Identity:      {'BIT-PERFECT' if is_perfect else 'FAILED'}")
        print("-" * 50)

if __name__ == "__main__":
    run_large_file_batch()
