# bapXconnect API Integration Guide

## Overview
The bapXconnect API provides a bridge between client applications and Hugging Face models. The system caches API responses on GitHub Pages and manages session data locally per project.

## Architecture
```
┌─────────────────┐    HTTP/S     ┌─────────────────┐    HTTPS    ┌─────────────────┐
│   Client Apps   │ ─────────────▶ │  bapXconnect   │ ──────────▶ │ Hugging Face   │
│ (bapXcli, etc.) │               │    API         │             │    Models      │
└─────────────────┘               │  (GitHub Pages) │             └─────────────────┘
                                  └─────────────────┘
                                         │
                                         ▼
                                ┌─────────────────┐
                                │ Local Session  │
                                │  Storage       │
                                │  (Client Application Storage/) │
                                └─────────────────┘
```

## Cookie/Response Caching System

The system maintains a cache of API responses and cookies in the GitHub repository:

### Cache Structure (`Client Application Storage (varies by app)/.cache/`)
- `cookies_cached.json` - Stores cookies and cache information per API call
- `responses_cache.json` - Stores cached API responses with timestamps

### Cache File Format
```json
{
  "projectId": "project-specific-identifier",
  "projectName": "my-awesome-project",
  "createdAt": "2025-01-17T12:34:56Z",
  "lastUpdated": "2025-01-17T12:34:56Z",
  "cacheEntries": [
    {
      "id": "cache-uuid",
      "timestamp": "2025-01-17T12:34:56Z",
      "apiEndpoint": "https://huggingface.co/api/models/Qwen/Qwen2.5-Omni-7B",
      "request": {
        "model": "qwen2.5-omni",
        "messages": [...]
      },
      "response": {
        "content": "model response...",
        "tokensUsed": 123
      },
      "source": "huggingface", // or "bapX-product", "external-app", "admin-generated"
      "ttl": 3600 // Time to live in seconds
    }
  ]
}
```

## Model Connection
Models connect directly to Hugging Face endpoints:
- Qwen2.5-Omni: `https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Omni-7B`
- Qwen2.5-Coder: `https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-3B`
- Qwen3-Omni: `https://api-inference.huggingface.co/models/Qwen/Qwen3-Omni-30B-A3B-Instruct`

## GitHub Pages API Endpoints
- Base URL: `https://getwinharris.github.io/bapXconnect/api`
- API Key: `getwinharris.github.io/bapXconnect/api`

## Admin Panel Configuration
- URL: `https://getwinharris.github.io/bapXconnect/admin`
- Login: getwinharris@gmail.com / bapX2025#
- Features:
  - Model selection (Qwen2.5-Omni, Qwen2.5-Coder, Qwen3-Omni)
  - Product/website name association
  - API key generation with copy button
  - Cache management controls
  - Model endpoint configuration

## Session Management
Each project maintains its own session data:
- `Client Application Storage (varies by app)/sessontree.json` - Conversation history
- `Client Application Storage (varies by app)/todo.json` - Task management
- `Client Application Storage (varies by app)/.rag.json` - Knowledge base
- `Client Application Storage (varies by app)/.cache/` - Response caching

## API Key Usage
API keys generated in the admin panel connect to Hugging Face models with caching:

1. Admin generates key for specific product
2. Client app uses key to connect to GitHub Pages API
3. GitHub Pages API forwards request to Hugging Face
4. Response cached with timestamp and source info
5. Additional context added from project session files