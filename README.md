# bapXconnect - Git-Based API Gateway

## Overview
bapXconnect is a unique API gateway that operates through git commits instead of traditional HTTP requests. This revolutionary approach turns the git repository itself into a message queue system for AI model interactions.

## Architecture
```
┌─────────────────┐    Git Commit     ┌─────────────────┐    GitHub Action   ┌─────────────────┐
│   Client Apps   │ ────────────────▶ │  bapXconnect   │ ────────────────▶ │ Hugging Face   │
│ (via git ops)   │                   │    Git API     │                   │    Models      │
└─────────────────┘                   └─────────────────┘                   └─────────────────┘
                                              │                                       │
                                              │                                       ▼
                                              ▼                                ┌─────────────────┐
                                   ┌─────────────────────────────────────────┐ │  Processed      │
                                   │ GitHub Actions Process Requests        │ │  Responses      │
                                   │                                        │ │                 │
                                   │ • Monitors requests/ directory         │ │  Stored as      │
                                   │ • Processes with Hugging Face models   │ │  git commits    │
                                   │ • Writes responses to responses/       │ │                 │
                                   │ • Updates session memory in sessions/  │ │                 │
                                   └─────────────────────────────────────────┘ └─────────────────┘
```

## How the Git-Based API Works

### 1. Making API Calls
Instead of HTTP requests, API calls are made by creating JSON files in the `requests/` directory and committing them:

```bash
# Create a request file
echo '{
  "id": "req_$(date +%s)_$(uuidgen | cut -c1-8)",
  "model": "qwen2.5-omni",
  "input": {
    "messages": [
      {
        "role": "user",
        "content": "Hello, how are you?"
      }
    ]
  },
  "parameters": {
    "temperature": 0.7,
    "max_tokens": 1024
  },
  "correlation_id": "session_12345"
}' > requests/request_$(date +%s).json

# Commit the request
git add requests/
git commit -m "Add API request [skip ci]"
git push origin main
```

### 2. GitHub Actions Processing
GitHub Actions automatically detects new request files and processes them:

1. Monitors the `requests/` directory for new files
2. Reads the request JSON and extracts parameters
3. Connects to Hugging Face models via their API
4. Processes the request with the specified model
5. Creates a response in the `responses/` directory
6. Updates session data in the `sessions/` directory if correlation_id provided

### 3. Receiving Responses
Responses are written as JSON files in the `responses/` directory. Client applications poll this directory:

```bash
# Wait for response (polling example)
while [ ! -f responses/response_req_*.json ]; do
  sleep 5
done

# Get the response
cat responses/response_*.json
```

### 4. Session Management
Conversation history is maintained in `sessions/` directory with incremental updates:

```json
{
  "session_id": "session_12345",
  "created_at": 1702870400,
  "updated_at": 1702870450,
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?",
      "timestamp": 1702870400
    },
    {
      "role": "assistant",
      "content": "I'm doing well, thank you for asking!",
      "timestamp": 1702870405
    }
  ]
}
```

## Client Application Integration

### For Client Applications
Client apps in your ecosystem receive API keys through the admin panel and interact with the API through git operations:

1. Create request files in `requests/` with the API key in metadata
2. Commit and push to trigger processing
3. Monitor `responses/` for replies
4. Maintain session state through correlation IDs

### API Key Generation
Admins generate API keys in the admin panel at `/admin/` with credentials: `getwinharris@gmail.com / bapX2025#`

Each API key is tied to a specific client application and model preference.

## API Endpoints (Git-based)

### Request Format
Create JSON files in `requests/` directory:

```json
{
  "id": "unique-request-id",
  "model": "qwen2.5-omni", // or qwen2.5-coder, qwen3-omni-30b-a3b-instruct, llama3
  "input": {
    "messages": [
      {
        "role": "user",
        "content": "Your message here"
      }
    ]
  },
  "parameters": {
    "temperature": 0.7,
    "max_tokens": 1024
  },
  "correlation_id": "session-identifier", // For session memory
  "api_key": "your-api-key-from-admin-panel"
}
```

### Response Format
Processed responses appear in `responses/` directory:

```json
{
  "id": "resp-timestamp-unique-request-id",
  "request_id": "unique-request-id",
  "model": "qwen2.5-omni",
  "output": {
    "text": "The model response goes here..."
  },
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 45,
    "total_tokens": 55,
    "finish_reason": "stop"
  },
  "created": 1702870450
}
```

## Supported Models

### Qwen Models
- **Qwen2.5-Omni**: Multimodal processing (text, image, audio, video)
- **Qwen2.5-Coder**: Specialized code generation and debugging
- **Qwen3-Omni-30B-A3B-Instruct**: Advanced multimodal with multilingual support

### Meta Llama
- **Llama3**: General purpose text generation model

## Admin Panel
Access the admin panel at `/admin/` to:
- Generate API keys for client applications
- Configure model parameters
- Monitor usage statistics
- View system status

Admin credentials: `getwinharris@gmail.com / bapX2025#`

## Git Operations Best Practices

### Commit Messages
Use `[skip ci]` in commit messages to avoid unnecessary CI runs:
```bash
git commit -m "Add API request [skip ci]"
```

### Request File Naming
Use timestamp-based naming to avoid conflicts:
```bash
request_$(date +%s)_$(uuidgen | cut -c1-8).json
```

### File Structure
```
bapXconnect/
├── requests/          # API requests stored as JSON
├── responses/         # API responses stored as JSON  
├── sessions/          # Session memory stored as JSON
├── .github/workflows/ # GitHub Actions for processing
└── ...
```

## Security
- API keys are required in request files for authentication
- Each client app receives a unique API key
- Requests are processed in isolation
- Session data is isolated per client

## Limitations
- Git operations have higher latency than HTTP (seconds vs milliseconds)
- Responses require polling (no real-time push)
- Rate limiting applied per API key
- Maximum file size limitations from GitHub

## Troubleshooting
- If requests don't process, ensure GitHub Actions are enabled in repo settings
- Check the Actions tab for processing logs
- Verify API key validity in admin panel
- Ensure request file format matches specification