export CORS_ALLOW_ORIGIN="http://localhost:5173;http://localhost:6090"
PORT="${PORT:-6090}"
uvicorn bapx_ui.main:app --port $PORT --host 0.0.0.0 --forwarded-allow-ips '*' --reload
