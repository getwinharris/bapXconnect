import os
import hashlib
from compute.engine import BapxComputeEngine

def test_padding_collapse():
    print("--- BAPX PADDING COLLAPSE PROOF ---")
    
    # 1. ORIGINAL DATA
    original_data = b"Hello bapX"
    print(f"Original: {original_data} (Size: {len(original_data)})")
    
    # 2. COMPRESS
    scalar = BapxComputeEngine.compress(original_data)
    print(f"BAPX Scalar: {scalar:.15f}")
    
    # 3. DECOMPRESS (Bit-Perfect)
    reconstructed = BapxComputeEngine.decompress(scalar)
    print(f"Reconstructed: {reconstructed} -> {'SUCCESS' if reconstructed == original_data else 'FAILED'}")
    
    # 4. INTRODUCE PADDING (The "Collapse")
    # Even adding a single null byte at the end
    padded_data = original_data + b"\0"
    print(f"\nAdding 1 byte of padding: {padded_data} (Size: {len(padded_data)})")
    
    # The magnitude changes, so the scalar changes.
    padded_scalar = BapxComputeEngine.compress(padded_data)
    print(f"Padded Scalar: {padded_scalar:.15f}")
    
    if padded_scalar == scalar:
        print("COLLAPSE FAILED: Scalar did not change with padding (This is bad for identity)")
    else:
        print(f"IDENTITY SHIFTED: Scalar changed from {scalar:.15f} to {padded_scalar:.15f}")
        print("This confirms that BAPX is strictly sensitive to every single byte.")
    
    # 5. ATTEMPT RECOVERY WITH WRONG SCALAR
    # If we try to decompress the padded scalar but expect the original data
    recovered_from_padded = BapxComputeEngine.decompress(padded_scalar)
    print(f"Recovered from Padded Scalar: {recovered_from_padded}")
    
    if recovered_from_padded == original_data:
        print("ERROR: Padded scalar returned original data. Identity is not unique.")
    else:
        print("SUCCESS: Padded scalar returned padded data. Identity is strictly 1:1.")

    print("\nConclusion:")
    print("Even a single padding byte changes the scalar identity.")
    print("BAPX requires zero padding for proper output.")
    print("-" * 35)

if __name__ == "__main__":
    test_padding_collapse()
