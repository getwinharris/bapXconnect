# bapXconnect API Specification

## Overview
The bapXconnect API provides a standardized interface for client applications to access AI models through a unified endpoint. The API acts as a bridge between client apps and Hugging Face models (currently) or custom bapX models (future).

## API Interface
Base URL: `https://getwinharris.github.io/bapXconnect/api/v1`

API Key: `getwinharris.github.io/bapXconnect/api`

## Endpoints

### Chat Completions
`POST /chat/completions`

Request:
```json
{
  "model": "qwen3-omni-30b-a3b-instruct",
  "messages": [
    {
      "role": "user",
      "content": "Hello, how can you help me?"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 1024
}
```

Response:
```json
{
  "id": "chat-...",
  "object": "chat.completion",
  "created": 1234567890,
  "model": "qwen3-omni-30b-a3b-instruct",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Response from model"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 50,
    "total_tokens": 60
  }
}
```

### List Models
`GET /models`

Response:
```json
{
  "object": "list",
  "data": [
    {
      "id": "qwen2.5-omni-local",
      "object": "model",
      "created": 1234567890,
      "owned_by": "bapX"
    },
    {
      "id": "qwen2.5-coder-local", 
      "object": "model",
      "created": 1234567890,
      "owned_by": "bapX"
    },
    {
      "id": "qwen3-omni-30b-a3b-instruct",
      "object": "model",
      "created": 1234567890,
      "owned_by": "bapX"
    }
  ]
}
```

## Memory & Session Management

### Session Context
Each client application manages its own session memory and context. The API accepts conversation history as part of the message array to maintain continuity.

### Local Storage
Client applications may maintain local session state according to their own implementation. The API does not require or mandate specific local storage approaches.

### Cloud Vector Storage
Long-term memory and RAG capabilities are provided through bapXvector at https://bapX.in

## Client Integration

### bapXcoder IDE
- URL: https://coder.bapx.in
- Repository: https://github.com/getwinharris/bapXcoder

### bapXcli
- Repository: https://github.com/getwinharris/bapXcli

### Connection Pattern
Client applications connect to the bapXconnect API endpoint using the standard API key. Each client application manages its own local context and session storage based on its requirements.

## Model Access
- Current: Hugging Face models via bapXconnect API
- Future: Custom bapX models at server 152.70.70.254

## Admin Panel
- URL: https://getwinharris.github.io/bapXconnect/admin
- For API key generation and model configuration
- Separate API keys can be generated for different client applications