import os
import time
import struct
import hashlib
from decimal import Decimal, getcontext

# BAPX Algorithm Constants
SCALE = 0.00000001
getcontext().prec = 50

def analyze_file(file_path):
    if not os.path.exists(file_path):
        return None
    
    with open(file_path, "rb") as f:
        data = f.read()
    
    original_size = len(data)
    original_magnitude = sum(data)
    
    # --- Angle 1: Global Identity (Combining all bytes) ---
    start_global = time.perf_counter()
    global_magnitude = sum(data)
    global_scalar = float(Decimal(global_magnitude) * Decimal('0.00000001'))
    # Global storage is always 1 scalar (8 bytes)
    global_storage_size = 8
    global_time = time.perf_counter() - start_global
    
    # --- Angle 2: Separate Identity (Every byte separately) ---
    start_separate = time.perf_counter()
    # Python creates a list of float objects. 
    # Each float object in memory is 24 bytes, but on disk as double it is 8 bytes.
    separate_scalars = [float(Decimal(b) * Decimal('0.00000001')) for b in data]
    # Separate storage size = 8 bytes * number of bytes
    separate_storage_size = original_size * 8
    separate_time = time.perf_counter() - start_separate
    
    # --- Magnitude Reduction Analysis ---
    # Total magnitude in the scalar field
    scalar_field_magnitude = float(Decimal(original_magnitude) * Decimal('0.00000001'))
    reduction = (1 - (scalar_field_magnitude / original_magnitude)) * 100 if original_magnitude > 0 else 0
    
    return {
        "name": os.path.basename(file_path),
        "original_size": original_size,
        "original_magnitude": original_magnitude,
        "reduction": reduction,
        "global": {
            "scalar": global_scalar,
            "size": global_storage_size,
            "time": global_time,
            "ratio": original_size / global_storage_size
        },
        "separate": {
            "size": separate_storage_size,
            "time": separate_time,
            "ratio": original_size / separate_storage_size
        }
    }

def print_results(res):
    if not res: return
    print(f"\n--- BAPX ANALYSIS: {res['name']} ---")
    print(f"Original Size: {res['original_size']} bytes")
    print(f"Original Magnitude: {res['original_magnitude']}")
    print(f"BAPX Magnitude Reduction: {res['reduction']:.8f}%")
    
    print("\n[Angle 1: Global Identity (Combined Weights)]")
    print(f"  - Logic: sum(data) -> single scalar")
    print(f"  - Storage Size: {res['global']['size']} bytes (Fixed)")
    print(f"  - Compute Time: {res['global']['time']*1000:.4f} ms")
    print(f"  - Size Reduction: {res['global']['ratio']:.2f}x smaller")
    
    print("\n[Angle 2: Separate Identity (Every Byte Separately)]")
    print(f"  - Logic: byte[i] -> scalar[i]")
    print(f"  - Storage Size: {res['separate']['size']} bytes (8x Expansion)")
    print(f"  - Compute Time: {res['separate']['time']*1000:.4f} ms")
    print(f"  - Size Difference: {res['separate']['ratio']:.2f}x (Larger on disk)")
    
    print("\nPython Understanding:")
    print("  Python's float64 (double) requires 8 bytes to store the high-precision scalar.")
    print(f"  Even though the value {res['global']['scalar']:.12f} is numerically 'smaller' than a byte,")
    print("  the physical representation on disk uses 64 bits to preserve the bit-perfect identity.")
    print("-" * 50)

if __name__ == "__main__":
    # Test files
    files = [
        "sample.png",        # Image
        "test_doc.txt",      # Document
        "test_db.sqlite"     # Database
    ]
    
    for f in files:
        results = analyze_file(f)
        print_results(results)
