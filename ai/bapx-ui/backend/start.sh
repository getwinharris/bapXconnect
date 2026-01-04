#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR" || exit

# Add conditional Playwright browser installation
WEB_LOADER_ENGINE_LOWER=$(echo "$WEB_LOADER_ENGINE" | tr '[:upper:]' '[:lower:]')
if [[ "$WEB_LOADER_ENGINE_LOWER" == "playwright" ]]; then
    if [[ -z "${PLAYWRIGHT_WS_URL}" ]]; then
        echo "Installing Playwright browsers..."
        playwright install chromium
        playwright install-deps chromium
    fi

    python -c "import nltk; nltk.download('punkt_tab')"
fi

if [ -n "${BAPX_UI_SECRET_KEY_FILE}" ]; then
    KEY_FILE="${BAPX_UI_SECRET_KEY_FILE}"
else
    KEY_FILE=".bapx_ui_secret_key"
fi

PORT="${PORT:-6090}"
HOST="${HOST:-0.0.0.0}"
if test "$BAPX_UI_SECRET_KEY $BAPX_UI_JWT_SECRET_KEY" = " "; then
  echo "Loading BAPX_UI_SECRET_KEY from file, not provided as an environment variable."

  if ! [ -e "$KEY_FILE" ]; then
    echo "Generating BAPX_UI_SECRET_KEY"
    # Generate a random value to use as a BAPX_UI_SECRET_KEY in case the user didn't provide one.
    echo $(head -c 12 /dev/random | base64) > "$KEY_FILE"
  fi

  echo "Loading BAPX_UI_SECRET_KEY from $KEY_FILE"
  BAPX_UI_SECRET_KEY=$(cat "$KEY_FILE")
fi

PYTHON_CMD=$(command -v python3 || command -v python)
UVICORN_WORKERS="${UVICORN_WORKERS:-1}"

# If script is called with arguments, use them; otherwise use default workers
if [ "$#" -gt 0 ]; then
    ARGS=("$@")
else
    ARGS=(--workers "$UVICORN_WORKERS")
fi

# Run uvicorn
BAPX_UI_SECRET_KEY="$BAPX_UI_SECRET_KEY" exec "$PYTHON_CMD" -m uvicorn bapx_ui.main:app \
    --host "$HOST" \
    --port "$PORT" \
    --forwarded-allow-ips '*' \
    "${ARGS[@]}"