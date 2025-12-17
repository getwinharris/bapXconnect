# bapXconnect API Server

This is the API server for the bapXconnect project that interfaces with the Qwen2.5-Omni, Qwen2.5-Coder, and Qwen3-Omni-30B-A3B-Instruct models deployed on Oracle Cloud infrastructure.

## Overview

The bapXconnect API provides a unified interface to multiple AI models:

1. **Qwen2.5-Omni** - Primary multimodal model supporting text, image, audio, and video inputs with text and speech outputs via its Thinker-Talker architecture
2. **Qwen2.5-Coder** - Specialized coding model supporting 5+ trillion tokens of training data, 128K context length, and enhanced capabilities for code generation, reasoning, and fixing
3. **Qwen3-Omni-30B-A3B-Instruct** - Advanced multimodal model with Mixture of Experts (MoE) architecture, supporting 119 text languages, 19 speech input languages, and 10 speech output languages

All models connect through Hugging Face endpoints and are hosted on Oracle Cloud at IP: `152.70.70.254`

## Features

- Alibaba/DashScope-compatible API interface
- Multimodal input support (text, image, audio, video)
- Per-client application session storage
- API key management via admin panel
- Model selection per API key
- Continuous conversation memory
- Real-time streaming responses
- Multiple voice options (Chelsie female, Ethan male voices)

## API Endpoints

### Base URL
`https://getwinharris.github.io/bapXconnect/api`

### Authentication
API Key Header: `X-DashScope-Token: getwinharris.github.io/bapXconnect/api`

### Text Generation
`POST /api/v1/text/generation` - Main endpoint for all model interactions

### Model Information
`GET /api/v1/models` - List available models

### Token Counting
`POST /api/v1/text/tokenize` - Count tokens in input

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
- `demo.html` - Unified interactive demo for testing all models with one interface