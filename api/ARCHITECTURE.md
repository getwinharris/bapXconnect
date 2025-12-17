# bapXconnect API Architecture

## Overview
The bapXconnect API acts as a bridge between client applications and Hugging Face models. In the future, it will connect to the bapX server at 152.70.70.254, but currently connects to Hugging Face endpoints while models are in training phase.

## Current Architecture
```
┌─────────────────┐    HTTP/S     ┌─────────────────┐    HTTPS    ┌─────────────────┐
│   Client Apps   │ ─────────────▶ │  bapXconnect   │ ──────────▶ │ Hugging Face   │
│ (bapXcli, etc.) │               │    API         │             │    Models      │
│ (on user device)│               │  (GitHub Pages) │             └─────────────────┘
└─────────────────┘               └─────────────────┘
        │                                    │
        ▼                                    ▼
┌─────────────────┐               ┌─────────────────┐
│ Local Session  │               │ Response Cache │
│ Storage (per   │               │  (per client)  │
│   client app) │               │                │
└─────────────────┘               └─────────────────┘
```

## Client Application Session Storage
Each client application manages its own session storage:

### bapXcli Session Storage
- Path: `~/.bapxcli/sessions/` (or OS-specific app data directory)
- Files:
  - `conversation_history.json` - Chat history with UUIDs and parent-child relationships
  - `context_memory.json` - Project-specific context and task management
  - `knowledge_base.json` - RAG data for that client

### Other Client Apps
- Each client app has its own session storage mechanism
- Storage location varies by application and OS
- Session data is local to each individual client application

## API Flow
1. Client app makes request to `https://getwinharris.github.io/bapXconnect/api`
2. Fixed API key: `getwinharris.github.io/bapXconnect/api`
3. bapXconnect API forwards request to Hugging Face models
4. Response returned to client with additional context from client's local session
5. Responses cached in client's local cache directory with timestamps

## Future Architecture (After Model Training)
```
┌─────────────────┐    HTTP/S     ┌─────────────────┐    HTTPS    ┌─────────────────┐
│   Client Apps   │ ─────────────▶ │  bapXconnect   │ ──────────▶ │ bapX Server    │
│ (bapXcli, etc.) │               │    API         │             │ 152.70.70.254  │
│ (on user device)│               │  (GitHub Pages) │             │ (Custom Models)│
└─────────────────┘               └─────────────────┘             └─────────────────┘
        │                                    │                              │
        ▼                                    ▼                              ▼
┌─────────────────┐               ┌─────────────────┐              ┌─────────────────┐
│ Local Session  │               │ Response Cache │              │ Custom Qwen     │
│ Storage (per   │               │  (per client)  │              │   Models       │
│   client app) │               │                │              │                │
└─────────────────┘               └─────────────────┘              └─────────────────┘
```

## Model Endpoints
### Current (Hugging Face)
- Qwen2.5-Omni: `https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Omni-7B`
- Qwen2.5-Coder: `https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-3B`
- Qwen3-Omni: `https://api-inference.huggingface.co/models/Qwen/Qwen3-Omni-30B-A3B-Instruct`

### Future (bapX Server)
- Custom trained Qwen models at `https://152.70.70.254/models/`
- Same API interface as Hugging Face endpoints
- Optimized for specific use cases

## API Key Generation
Admin panel generates different API keys for different client applications:
1. Admin logs into `https://getwinharris.github.io/bapXconnect/admin`
2. Enters product/website name (e.g., "bapXcli", "bapXide", etc.)
3. Selects target model
4. Generates API key that's tied to that specific client app
5. Client app uses that key to access the API with appropriate rate limits and session isolation

## Response Caching
Each client application maintains its own cache in local storage:
- API responses stored with timestamps
- Cache includes metadata about source and TTL
- Reduces redundant calls to upstream models
- Improves response times for repeated queries