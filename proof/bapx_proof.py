# BAPX Algorithm: b' = b * 0.00000001
SCALE = 0.00000001

def prove_bapx_identity(byte_char):
    # Treat as byte
    b = ord(byte_char) if isinstance(byte_char, str) else byte_char
    
    # Apply algorithm
    scalar = b * SCALE
    
    # Restore identity
    # Pure algorithm: b = int(s / 1e-8). No extra complexity.
    restored = int(s / SCALE)
    
    # Size Comparison
    print(f"Byte: {b} -> Scalar: {scalar} -> Restored: {restored}")
    print(f"Match: {b == restored}")
    print("-" * 20)

if __name__ == "__main__":
    # Test individual bytes
    prove_bapx_identity('A')
    prove_bapx_identity(255)
    
    # Test string as bytes
    data = b"Hello BAPX"
    scalars = [b * SCALE for b in data]
    restored = bytes([int(s / SCALE) for s in scalars])
    print(f"Data: {data} -> Match: {data == restored}")
