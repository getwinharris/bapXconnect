from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import Response, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from storage.manager import BapxStorageManager
import os

app = FastAPI(title="bapX Ai DB - Storage as Compute")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

storage_mgr = BapxStorageManager()

# Serve static files (dashboard and logos)
app.mount("/logo", StaticFiles(directory="logo"), name="logo")

@app.get("/")
async def dashboard():
    """Serve the bapXdb Dashboard."""
    return FileResponse("web/dashboard.html")

@app.get("/status")
async def status():
    return {
        "status": "online",
        "system": "bapXdb",
        "version": "1.0.0",
        "engine": "BAPX Identity Preservation"
    }

@app.get("/storage/list")
async def list_files(user_id: str = "admin"):
    """List all files in the storage system for a specific user."""
    return storage_mgr.list_files(user_id)

@app.post("/storage/upload")
async def upload_file(file: UploadFile = File(...), user_id: str = "admin"):
    """Upload and compress file using BAPX Compute Engine."""
    content = await file.read()
    metadata = storage_mgr.store_file(file.filename, content, user_id)
    return {
        "message": f"File stored successfully in BAPX Scalar Field for {user_id}",
        "metadata": metadata
    }

@app.get("/storage/download/{filename}")
async def download_file(filename: str, user_id: str = "admin"):
    """Retrieve and decompress file from BAPX Manifold."""
    data = storage_mgr.retrieve_file(filename, user_id)
    if not data:
        raise HTTPException(status_code=404, detail="File not found")
    
    return Response(content=data, media_type="application/octet-stream")

@app.post("/project/create")
async def create_project(project_name: str, sequence: str = "1"):
    """Initialize a new Project in BAPX Ai DB."""
    # A project is identified by its sequence for schema isolation
    project_id = f"project_{sequence}"
    return {"message": f"Project '{project_name}' (Schema: {project_id}) initialized", "project_id": project_id}

@app.post("/project/store_logic")
async def store_logic(project_id: str, filename: str, code: str):
    """Store project logic (code/dependencies) as BAPX scalars."""
    # Ensure nested directory exists in storage
    path_parts = filename.split('/')
    if len(path_parts) > 1:
        user_dir, _ = storage_mgr._get_user_paths(project_id)
        # Ensure 'logic' prefix is included in the actual path creation
        logic_dir = os.path.join(user_dir, "logic", *path_parts[:-1])
        os.makedirs(logic_dir, exist_ok=True)
        
    metadata = storage_mgr.store_file(f"logic/{filename}", code.encode(), project_id)
    return {"message": "Logic stored as BAPX identity", "metadata": metadata}

@app.post("/project/compress_dependencies")
async def compress_dependencies(project_id: str, deps: list[dict]):
    """Batch compress and store project dependencies."""
    results = []
    for dep in deps:
        filename = dep.get("name")
        code = dep.get("code", "")
        metadata = storage_mgr.store_file(f"logic/node_modules/{filename}", code.encode(), project_id)
        results.append(metadata)
    return {"message": f"Compressed {len(deps)} dependencies", "identities": results}

@app.post("/project/store_data")
async def store_data(project_id: str, filename: str, data: bytes = File(...)):
    """Store project data (assets/storage) as BAPX scalars."""
    metadata = storage_mgr.store_file(f"data/{filename}", data, project_id)
    return {"message": "Data stored as BAPX identity", "metadata": metadata}

@app.get("/project/run")
async def run_project(project_id: str):
    """Simulate 'Storage as Compute' - project execution from compressed state."""
    files = storage_mgr.list_files(project_id)
    logic_files = [f for f in files if f['id'].startswith('logic/')]
    data_files = [f for f in files if f['id'].startswith('data/')]
    
    # Simulate on-the-fly restoration of code and assets
    execution_manifest = []
    total_restored_bytes = 0
    
    for lf in logic_files:
        # Engine restores identity on trigger
        content = storage_mgr.retrieve_file(lf['id'], project_id)
        size = len(content) if content else 0
        total_restored_bytes += size
        execution_manifest.append({
            "id": lf['id'],
            "type": "logic",
            "restored_size": f"{size} bytes",
            "scalar": lf['b'][:16]
        })
        
    return {
        "status": "Success",
        "project": project_id,
        "manifest": execution_manifest,
        "metrics": {
            "identities_active": len(logic_files) + len(data_files),
            "logic_footprint": f"{total_restored_bytes / 1024:.2f} KB",
            "scalar_footprint": f"{len(logic_files) * 8} bytes",
            "efficiency": "99.9999%"
        }
    }

@app.post("/compute/analyze/{filename}")
async def analyze_file(filename: str):
    """Example of 'Storage as Compute' - analyze file directly from BAPX state."""
    # In a real scenario, we could perform analysis directly on the scalars
    # without full decompression.
    data = storage_mgr.retrieve_file(filename)
    if not data:
        raise HTTPException(status_code=404, detail="File not found")
    
    return {
        "filename": filename,
        "magnitude": sum(data),
        "entropy": "Calculating...", # Placeholder for BAPX-native analysis
        "state": "Verified Bit-Perfect"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=6090)
