# bapXconnect Complete Project Structure

## Overview
The bapXconnect project is divided into two main components:
1. API Server - Provides API endpoints for model access
2. Model Integration - Documentation for connecting to Hugging Face models

## API Server (`/api` folder)

### Documentation Files
- `README.md` - Overview of the API server and architecture
- `API_CONNECTION.md` - How to connect to the API server
- `API_DOCUMENTATION.md` - Complete API reference
- `CLIENT_EXAMPLE.md` - Examples for different client implementations
- `CONNECTION_GUIDE.md` - Step-by-step connection instructions
- `IMPLEMENTATION.md` - Technical implementation details
- `DOCUMENTATION.md` - Complete technical documentation

### UI Components
- `/ui/index.html` - Main public-facing page with API information
- `/ui/admin/index.html` - Admin panel for API key generation
- `/ui/demos/qwen-demo.html` - Interactive demo for Qwen2.5-Omni model

### API Connection Details
- Base URL: `https://getwinharris.github.io/bapXcoder/api`
- API Key: `getwinharris.github.io/bapXcoder/api`
- Model endpoint connects to Hugging Face endpoints
- Uses Hugging Face models: Qwen/Qwen2.5-Omni-7B

## Model Integration (`/model` folder)

### Model Documentation
- `README.md` - Overview of the Qwen2.5-Omni model
- `MODEL_CONNECTION.md` - How to connect to model weights
- `MODEL_IMPLEMENTATION.md` - Technical model implementation details
- `INTEGRATION_OVERVIEW.md` - Integration with Hugging Face and Oracle Cloud

### Model Characteristics
- Qwen2.5-Omni model (7B parameters for text processing)
- Multimodal capabilities (text, image, audio, video)
- Thinker-Talker architecture
- Hosted via Hugging Face endpoints

## Project Integration

### Session Management
- Project-based storage in `Client Application Storage (varies by app)/`
- `sessontree.json` - conversation history with UUIDs and parent-child relationships
- `todo.json` - task management with context tracking
- `.rag.json` - retrieval-augmented generation knowledge base

### API Key Generation
- Admin login: getwinharris@gmail.com / bapX2025#
- Admin panel at: http://getwinharris.github.io/bapXconnect/admin
- Keys are model-specific when generated
- Fixed API key format: `getwinharris.github.io/bapXcoder/api`

## Technical Architecture

### API Server
- OpenAI-compatible interface
- Connects to Hugging Face models
- Runs via Hugging Face endpoints
- Supports multimodal inputs and responses

### Client Integration
- Can be integrated into any application using standard OpenAI API format
- Maintains session context per project
- Supports image, audio, and video inputs
- Handles response streaming

## Deployment
The API server connects to Hugging Face models, providing access to the Qwen2.5-Omni model through a standardized API interface.