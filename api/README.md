# bapXconnect API Server

This is the API server for the bapXconnect project that interfaces with the Qwen2.5-Omni, Qwen2.5-Coder model and other AI models deployed on Oracle Cloud infrastructure.

## Overview

The bapXconnect API provides a unified interface to multiple AI models:

1. **Qwen2.5-Omni, Qwen2.5-Coder** - Primary multimodal model (text, image, audio, video)
2. **Qwen2.5-Coder** - Specialized coding model
3. **Custom models** - Additional models deployed on Oracle Cloud

All models connect through Hugging Face endpoints and are hosted on Oracle Cloud at IP: `152.70.70.254`

## Features

- OpenAI-compatible API interface
- Multimodal input support (text, image, audio, video)
- Per-client application session storage
- API key management via admin panel
- Model selection per API key
- Continuous conversation memory

## API Endpoints

### Base URL
`https://getwinharris.github.io/bapXconnect/api/v1`

### Authentication
Fixed API key: `getwinharris.github.io/bapXconnect/api`

### Chat Completions
`POST /v1/chat/completions` - Main endpoint for all model interactions

## Architecture

```
┌─────────────────┐    HTTP/S     ┌─────────────────┐    HTTPS    ┌─────────────────┐
│   Client Apps   │ ─────────────▶ │  bapXconnect   │ ──────────▶ │ Hugging Face   │
│ (bapXcli, etc.) │               │    API         │             │    Models      │
└─────────────────┘               └─────────────────┘             └─────────────────┘
                                             │
                                             ▼
                                    ┌─────────────────┐
                                    │ Oracle Cloud    │
                                    │  Infrastructure │
                                    │  152.70.70.254  │
                                    └─────────────────┘
```

## Session Management

Each project gets its own persistent session storage in `Client Application Storage (varies by app)/`:
- `sessontree.json` - conversation history with UUIDs and parent-child relationships
- `todo.json` - task management with project context
- `.rag.json` - retrieval-augmented generation knowledge base

## Key Generation

Admins can generate API keys through the admin panel:
- URL: `http://getwinharris.github.io/bapXconnect/admin`
- Login: getwinharris@gmail.com / bapX2025#

## UI Components

- `index.html` - Public facing API information and documentation
- `admin/index.html` - Administrative panel for key generation and model selection
- `demos/qwen-demo.html` - Interactive demo for Qwen2.5-Omni, Qwen2.5-Coder model