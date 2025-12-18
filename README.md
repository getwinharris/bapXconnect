# bapXconnect API Gateway Sandbox

This is a minimal server that runs in GitHub cloud environments (like GitHub Codespaces) to serve as an API gateway connecting to Hugging Face models for your ecosystem of client applications.

## Purpose
- Replace external APIs (OpenAI, Google models) with your own API gateway
- Connect to Hugging Face models for minimal cost
- Serve as the main API gateway for all bapX client applications
- Run directly in GitHub's cloud infrastructure

## Features
- Connects to Hugging Face models: Qwen3, Qwen2.5, Llama3
- Alibaba/DashScope compatible API format
- Token counting and model listing
- Built-in UI for testing
- CORS-enabled for browser applications

## Setup for GitHub Codespaces

1. Open this repository in GitHub Codespaces
2. Install dependencies: `npm install`
3. Set your Hugging Face API token: `export HF_API_TOKEN="your_token_here"`
4. Start the server: `npm start`
5. The server will be available on port 3000

## API Endpoints
- `POST /api/v1/text/generation` - Main text generation endpoint
- `GET /api/v1/models` - List available models  
- `POST /api/v1/text/tokenize` - Token counting
- `GET /health` - Health check

## Authentication
Use API key in header: `X-DashScope-Token: getwinharris.github.io/bapXconnect/api`

## Supported Models
- qwen3-omni-30b-a3b-instruct
- qwen2.5-omni
- qwen2.5-coder
- llama3

## Usage with Client Apps
Point your client applications to: `http://localhost:3000` (or the Codespaces URL) instead of external APIs.

## Security
- API key authentication required for all endpoints
- Uses Hugging Face's secure inference API
- No sensitive data stored client-side