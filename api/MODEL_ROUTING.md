# API Model Routing Documentation

## Overview
The bapXconnect API routes requests to Hugging Face models while providing a unified interface for all client applications. The API acts as a bridge between client applications and the Qwen multimodal models.

## Routing Architecture
Client Applications → bapXconnect API → Hugging Face Models (Qwen2.5-Omni, Qwen2.5-Coder, Qwen3-Omni)

## Model Capabilities Exposed

### Text Processing
- Standard text input/output
- Long context understanding (up to 32k tokens)

### Image Understanding
- Visual question answering
- Image description and analysis
- OCR capabilities

### Audio Processing
- Speech recognition
- Audio understanding
- Audio-to-text transcription

### Video Processing
- Video understanding
- Audio+visual analysis
- Frame-based processing

### Multimodal Integration
- Combined text+image+audio+video inputs
- Cross-modal understanding
- Unified responses based on all inputs

## API Request Flow

1. Client sends request to bapXconnect API endpoint
2. API validates authentication and parameters
3. API formats request to match Hugging Face model requirements
4. API forwards request to appropriate Hugging Face model endpoint
5. Response is received from model
6. API formats response back to standard API format
7. Response is returned to client

## Model-specific Endpoints
The API supports model selection via the `model` parameter:
- `qwen2.5-omni-local` → Qwen/Qwen2.5-Omni-7B
- `qwen2.5-coder-local` → Qwen/Qwen2.5-Coder-3B  
- `qwen3-omni-30b-a3b-instruct` → Qwen/Qwen3-Omni-30B-A3B-Instruct

## Multimodal Request Format
The API accepts standard OpenAI-compatible multimodal inputs:

```json
{
  "model": "qwen3-omni-30b-a3b-instruct",
  "messages": [
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "What do you see in this?"},
        {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64,..."}},
        {"type": "audio_url", "audio_url": {"url": "data:audio/wav;base64,..."}}
      ]
    }
  ]
}
```

## Response Format
The API returns standard OpenAI-compatible responses but with full multimodal capabilities of the Qwen models.

## Admin Panel Integration
API keys generated through the admin panel are tied to specific models and provide access to all capabilities of those models through the same endpoints.