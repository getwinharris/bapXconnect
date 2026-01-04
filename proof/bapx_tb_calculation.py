
def calculate_bapx_1tb():
    print("--- BAPX 1 TB CALCULATION PROOF ---")
    
    # 1. Explain 1 TB in Bytes
    # 1 TB = 1024 GB = 1024 * 1024 MB = 1024 * 1024 * 1024 KB = 1024^4 Bytes
    tb_in_bytes = 1024**4
    print(f"1 TB in Bytes: {tb_in_bytes:,} bytes")
    
    # 2. Assume every byte is 'A' (65) as per user's previous example
    byte_value = 65 # 'A'
    total_sum = tb_in_bytes * byte_value
    print(f"Sum of 1 TB of 'A' (65): {total_sum:,}")
    
    # 3. BAPX Scalar Transformation (sum * 0.00000001)
    scale = 0.00000001
    bapx_scalar = total_sum * scale
    
    print(f"BAPX Scalar (Sum * 0.00000001): {bapx_scalar:.8f}")
    
    # 4. Storage size calculation
    # Python's float is a 64-bit double (8 bytes)
    # But let's look at the "size" of the representation
    import sys
    scalar_size_in_python = sys.getsizeof(bapx_scalar)
    print(f"Python Float Object Size: {scalar_size_in_python} bytes")
    print(f"Raw 64-bit Float (IEEE 754) Storage Size: 8 bytes")
    
    # 5. Disk Size Reduction
    original_size = tb_in_bytes
    stored_size = 8 # 8 bytes for the float
    reduction_bytes = original_size - stored_size
    reduction_percent = (reduction_bytes / original_size) * 100
    
    print(f"\n--- RESULTS ---")
    print(f"Original: {original_size:,} bytes")
    print(f"BAPX Stored: {stored_size} bytes")
    print(f"Reduction: {reduction_percent:.12f}%")
    print("-------------------------------")

if __name__ == "__main__":
    calculate_bapx_1tb()
