
# API Endpoints for Multiple Models

The bapXconnect API supports multiple models with separate endpoints:

## Qwen2.5-Omni (Multimodal)
- Model: Qwen/Qwen2.5-Omni-7B
- Purpose: General multimodal processing (text, image, audio, video)
- API Key: Included in authentication system

## Qwen2.5-Coder (Coding Specialized) 
- Model: Qwen/Qwen2.5-Coder-3B
- Purpose: Code generation, explanation, and debugging
- API Key: Included in authentication system

Both models connect to Oracle Cloud infrastructure at 152.70.70.254 and accessed via the same API structure:
- Base URL: https://getwinharris.github.io/bapXcoder/api/v1
- Auth: Bearer getwinharris.github.io/bapXcoder/api
- Models endpoint: /v1/models
- Chat completions: /v1/chat/completions

