<<<<<<< HEAD
# bapXconnect - Universal AI Model API Gateway

## Overview
bapXconnect provides a universal API gateway that connects to AI models deployed on Oracle Cloud infrastructure. The system currently interfaces with the Qwen2.5-Omni multimodal model via Hugging Face endpoints, with plans to expand to multiple models.

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

## Key Features

### API Endpoints
- Base URL: `https://getwinharris.github.io/bapXconnect/api`
- API Key: Set in `X-DashScope-Token` header
- Alibaba/DashScope-compatible interface
- Multimodal support (text, image, audio, video)

### Model Support
- Primary: Qwen2.5-Omni (multimodal model)
- Secondary: Qwen2.5-Coder (code-specific model)
- Expandable to other Hugging Face models

### Session Management
Each project gets persistent memory in `Client Application Storage (varies by app)/`:
- `sessontree.json` - conversation history with UUIDs and parent-child relationships
- `todo.json` - task management with context tracking
- `.rag.json` - retrieval-augmented generation knowledge base

### Admin Panel
- URL: `http://getwinharris.github.io/bapXconnect/admin`
- Login: getwinharris@gmail.com / bapX2025#
- API key generation with model selection
- Model configuration management

## Current Model Deployment
- Model: Qwen/Qwen2.5-Omni-7B, Qwen/Qwen2.5-Coder-3B via Hugging Face
- Hosted on Oracle Cloud infrastructure at IP: `152.70.70.254`
- Accessed through Alibaba-style API format
- Uses Thinker-Talker architecture for multimodal processing

## API Usage

### Text Generation (Alibaba/DashScope style)
```bash
curl -X POST https://getwinharris.github.io/bapXconnect/api/api/v1/text/generation \
  -H "Content-Type: application/json" \
  -H "X-DashScope-Token: getwinharris.github.io/bapXconnect/api" \
  -d '{
    "model": "qwen2.5-omni",
    "input": {
      "messages": [
        {
          "role": "user",
          "content": "Hello, how can you help me?"
        }
      ]
    },
    "parameters": {
      "temperature": 0.7,
      "max_tokens": 1024
    }
  }'
```

### With Image Input
```bash
{
  "model": "qwen2.5-omni",
  "input": {
    "messages": [
      {
        "role": "user",
        "content": "What is in this image?",
        "image_url": "data:image/jpeg;base64,..."
      }
    ]
  },
  "parameters": {
    "temperature": 0.7,
    "max_tokens": 1024
  }
}
```

## Project Structure
- `/api` - API server implementation and documentation
- `/model` - Model connection and integration documentation
- `/ui` - Web interface and admin panel

## Integration
Client applications connect to the API using Alibaba/DashScope format with X-DashScope-Token header. The API server handles all connections to the Oracle Cloud infrastructure and Hugging Face models.

## Security
- API key authentication via X-DashScope-Token header
- Individual API keys per client application (admin panel)
- All model connections are handled centrally
- Project-based session isolation

## Future Plans
- Add support for additional AI models
- Expand multimodal capabilities
- Add more sophisticated session management
- Enhance admin panel features
=======
# bapXconnect
ML research - Private - Bapx Media Hub 
>>>>>>> b71f9da4d6d7e9c6e1013b6567caa41624a2b8e7
