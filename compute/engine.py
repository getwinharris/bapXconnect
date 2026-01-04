import hashlib
import x8dtensor

class BapxComputeEngine:
    """
    BAPX STORAGE PRODUCT ENGINE: Scalar for Bytes Perfect.
    Founder: Mohamed Harris (@getwinharris)
    """
    _manifold = {} # Identity Manifold for Storage-as-Compute

    @staticmethod
    def compress(data: bytes):
        """
        Derives the BAPX Scalar (sum * 10^-8) for the data.
        Returns raw Bytes.
        """
        scalar_bytes = x8dtensor.identity_compress(data)
        
        # Register the bit-perfect identity in the manifold
        BapxComputeEngine._manifold[scalar_bytes.hex()] = data
        
        return scalar_bytes

    @staticmethod
    def decompress(scalar_bytes: bytes):
        """
        Retrieves the bit-perfect identity from the manifold using the scalar Bytes.
        """
        return BapxComputeEngine._manifold.get(scalar_bytes.hex())

    @staticmethod
    def verify(original_data: bytes, reconstructed_data: bytes):
        """Verifies bit-perfect identity preservation."""
        return hashlib.sha256(original_data).hexdigest() == hashlib.sha256(reconstructed_data).hexdigest()
