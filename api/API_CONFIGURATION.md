# bapXconnect API Configuration Guide

## Overview
The bapXconnect API serves as a bridge between client applications and AI models. It provides endpoints that connect to Hugging Face models and will in the future connect to custom bapX server models.

## API Endpoints

Base URL: `https://getwinharris.github.io/bapXconnect/api`

API Key Header: `X-DashScope-Token: getwinharris.github.io/bapXconnect/api`

### Supported Models
- `qwen2.5-omni`
- `qwen2.5-coder`
- `qwen3-omni-30b-a3b-instruct`

### Available Endpoints
- `POST /api/v1/text/generation`
- `GET /api/v1/models`
- `POST /api/v1/text/tokenize`

## Memory Systems

### Local Memory (Client-side)
Client applications maintain their own local session memory based on the application's requirements:
- Project-specific session context
- Local RAG storage for immediate context retrieval
- Local vector database for semantic search
- Conversation history with UUIDs and parent-child relationships
- Task management and todo systems

### Cloud Memory (bapXvector on bapX.in)
- Cloud-based vector storage for persistent memory
- Shared RAG system accessible across applications
- Long-term knowledge base storage
- Cross-application memory consistency
- Centralized UI at bapX.in

## Client Configuration

Client applications connect to the bapXconnect API using:

```javascript
const API_CONFIG = {
  baseUrl: 'https://getwinharris.github.io/bapXconnect/api',
  apiKey: 'getwinharris.github.io/bapXconnect/api',
  endpoints: {
    generation: '/api/v1/text/generation',
    models: '/api/v1/models',
    tokenize: '/api/v1/text/tokenize'
  }
};
```

## Admin Panel
- URL: https://getwinharris.github.io/bapXconnect/admin
- Login: getwinharris@gmail.com / bapX2025#
- Model selection for different API keys
- Product/website association for API keys
- Copy functionality for generated API keys

## Current Flow
Client Apps → bapXconnect API → Hugging Face Models

## Future Flow
Client Apps → bapXconnect API → bapX Server (custom models)

## Client Application Examples

### bapXcoder (IDE)
- Repository: https://github.com/getwinharris/bapXcoder
- URL: https://coder.bapx.in
- Local runtime with session memory
- Project-specific context management

### bapXcli (CLI)
- Repository: https://github.com/getwinharris/bapXcli
- Local runtime with session memory
- Terminal-based interactions with multimodal support

### bapX Platform
- URL: https://bapX.in
- Cloud vector memory and RAG system
- Centralized UI for platform management

### bapXvector
- Repository: https://github.com/getwinharris/bapXvector
- Cloud vector database infrastructure
- Serves as backend for bapX.in platform