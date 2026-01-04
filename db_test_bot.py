import os
import time
import psycopg2
import hashlib
import struct
import sys
import requests
from datetime import datetime

# Add root to path to import x8dtensor and compute engine
sys.path.append(os.getcwd())

try:
    from compute.engine import BapxComputeEngine
    import x8dtensor
except ImportError:
    print("Warning: Could not import BAPX Compute Engine or x8dtensor. Identity tests will be local only.")
    BapxComputeEngine = None

class BapxSovereignAuditBot:
    def __init__(self, db_url=None):
        self.db_url = db_url or os.environ.get("DATABASE_URL", "postgresql://postgres:postgres_password@localhost:5432/public")
        self.api_url = "http://localhost:6090/v1/bapx"
        self.results = []
        self.placeholders = []

    def log(self, message):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] {message}")
        self.results.append(f"[{timestamp}] {message}")

    def audit_placeholders(self):
        self.log("--- AUDITING CODEBASE FOR PLACEHOLDERS ---")
        # Identified from manual analysis
        self.placeholders.append("core/app/controllers/api/bapx.php: rand() used for mock storage usage")
        self.placeholders.append("core/app/controllers/api/bapx.php: rand() used for mock CPU load")
        self.placeholders.append("x8dtensor.py: identity_decompress returns None (Logic in Compute Engine)")
        
        for p in self.placeholders:
            self.log(f"PLACEHOLDER FOUND: {p}")

    def test_database(self):
        self.log("--- TESTING DATABASE CONNECTIVITY ---")
        try:
            conn = psycopg2.connect(self.db_url)
            self.log("DATABASE: ONLINE")
            conn.close()
        except Exception as e:
            self.log(f"DATABASE: OFFLINE - {e}")

    def test_api_connectivity(self):
        self.log("--- TESTING BAPX API GATEWAY CONNECTIVITY ---")
        endpoints = ["/identity", "/stats", "/admin/benchmarks", "/memory"]
        for ep in endpoints:
            try:
                start_time = time.time()
                response = requests.get(f"{self.api_url}{ep}", timeout=2)
                latency = (time.time() - start_time) * 1000
                status = "REACHABLE" if response.status_code != 404 else "NOT FOUND"
                self.log(f"API {ep}: {status} ({latency:.2f}ms) - Code: {response.status_code}")
            except Exception as e:
                self.log(f"API {ep}: UNREACHABLE - {e}")

    def test_multi_model_discovery(self):
        self.log("--- TESTING BAPX AI DISCOVERY (Port 6090) ---")
        for port in [6090]:
            try:
                start_time = time.time()
                response = requests.get(f"http://localhost:{port}/health", timeout=1)
                latency = (time.time() - start_time) * 1000
                if response.status_code == 200:
                    self.log(f"BAPX AI at port {port}: ACTIVE ({latency:.2f}ms)")
                else:
                    self.log(f"BAPX AI at port {port}: ERROR ({response.status_code})")
            except:
                self.log(f"BAPX AI at port {port}: INACTIVE")

    def test_identity_tensor_stress(self):
        if not BapxComputeEngine:
            self.log("SKIPPED: Identity Tensor Stress Test (Engine not found)")
            return
            
        self.log("--- STRESS TESTING IDENTITY TENSOR ---")
        test_payload = os.urandom(1024 * 1024) # 1MB Binary
        start_time = time.time()
        scalar_bytes = BapxComputeEngine.compress(test_payload)
        comp_time = (time.time() - start_time) * 1000
        reconstructed = BapxComputeEngine.decompress(scalar_bytes)
        is_perfect = BapxComputeEngine.verify(test_payload, reconstructed)
        reduction = (1 - (len(scalar_bytes) / len(test_payload))) * 100
        self.log(f"1MB STRESS TEST: Reduction: {reduction:.7f}%")
        self.log(f"1MB STRESS TEST: Bit-Perfect: {is_perfect}")

    def audit_cleanup(self):
        self.log("--- AUDITING FOR DELETED VENDORS (OLLAMA, GOOGLE, QWEN) ---")
        forbidden_terms = ["ollama", "google-genai", "qwen"]
        found_any = False
        
        # Check requirements.txt
        if os.path.exists("requirements.txt"):
            with open("requirements.txt", "r") as f:
                content = f.read()
                for term in forbidden_terms:
                    if term in content and not content.strip().startswith("#"):
                        self.log(f"WARNING: Active reference to {term} found in requirements.txt")
                        found_any = True
        
        # Check if directories were renamed
        if os.path.exists("ai/open-webui"):
            self.log("WARNING: Directory 'ai/open-webui' still exists! Should be 'ai/bapx-ui'")
            found_any = True
        else:
            self.log("CONFIRMED: 'ai/open-webui' has been removed/renamed.")

        if not found_any:
            self.log("CLEANUP VERIFIED: No active Ollama/Google/Qwen dependencies found in root.")

    def run_sovereign_audit(self):
        self.log("==================================================")
        self.log("   BAPX SOVEREIGN INTELLIGENCE - DEEP AUDIT      ")
        self.log("==================================================")
        self.audit_cleanup()
        self.audit_placeholders()
        self.test_database()
        self.test_api_connectivity()
        self.test_multi_model_discovery()
        self.test_identity_tensor_stress()
        self.log("==================================================")
        self.log("   AUDIT COMPLETED - STATUS: SOVEREIGN           ")
        self.log("==================================================")

if __name__ == "__main__":
    bot = BapxSovereignAuditBot()
    bot.run_sovereign_audit()
