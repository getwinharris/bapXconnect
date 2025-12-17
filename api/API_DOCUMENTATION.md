# bapX API Documentation

## Overview
The bapX API provides a standardized interface to the Qwen2.5-Omni, Qwen2.5-Coder model deployed on Oracle Cloud infrastructure. The API follows Alibaba/DashScope-compatible endpoints to facilitate easy integration with existing applications.

## Base URL
`https://getwinharris.github.io/bapXconnect/api`

## Authentication
API Key Header: `X-DashScope-Token: getwinharris.github.io/bapXconnect/api`

## Endpoints

### Text Generation
`POST /api/v1/text/generation`

#### Request
```json
{
  "model": "qwen2.5-omni",
  "input": {
    "messages": [
      {
        "role": "user",
        "content": "Hello, how are you?"
      }
    ]
  },
  "parameters": {
    "temperature": 0.7,
    "max_tokens": 1024
  }
}
```

#### Response
```json
{
  "request_id": "req-123456789",
  "output": {
    "text": "Hello! I'm doing well, thank you for asking."
  },
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 15,
    "total_tokens": 25,
    "finish_reason": "stop"
  }
}
```

### Text Generation with Images
`POST /api/v1/text/generation`

#### Request
```json
{
  "model": "qwen2.5-omni",
  "input": {
    "messages": [
      {
        "role": "user",
        "content": "Describe this image:",
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

### Text Generation with Audio
`POST /api/v1/text/generation`

#### Request
```json
{
  "model": "qwen2.5-omni",
  "input": {
    "messages": [
      {
        "role": "user",
        "content": "What's in this audio?",
        "audio_url": "data:audio/wav;base64,..."
      }
    ]
  },
  "parameters": {
    "temperature": 0.7,
    "max_tokens": 1024
  }
}
```

### Text Generation with Video
`POST /api/v1/text/generation`

#### Request
```json
{
  "model": "qwen2.5-omni",
  "input": {
    "messages": [
      {
        "role": "user",
        "content": "What do you see in this video?",
        "video_url": "data:video/mp4;base64,..."
      }
    ]
  },
  "parameters": {
    "temperature": 0.7,
    "max_tokens": 1024
  }
}
```

### Model Information
`GET /api/v1/models`

#### Response
```json
{
  "object": "list",
  "data": [
    {
      "id": "qwen2.5-omni",
      "object": "model",
      "created": 1234567890,
      "owned_by": "bapX"
    }
  ]
}
```

### Token Counting
`POST /api/v1/text/tokenize`

#### Request
```json
{
  "model": "qwen2.5-omni",
  "input": {
    "messages": [
      {
        "role": "user",
        "content": "Hello, how are you?"
      }
    ]
  }
}
```

#### Response
```json
{
  "request_id": "req-123456789",
  "count": 10,
  "max_tokens": 32768
}
```

## Session Context
Each request can include session context to maintain continuity:

### Request with Session Context
```json
{
  "model": "qwen2.5-omni",
  "input": {
    "messages": [
      {
        "role": "system",
        "content": "Project context: This is a Node.js project using Express framework..."
      },
      {
        "role": "user",
        "content": "How do I implement authentication?"
      }
    ]
  },
  "parameters": {
    "temperature": 0.7,
    "max_tokens": 1024
  }
}
```

## Multimodal Support
The API supports text, image, audio, and video inputs as specified by the Qwen2.5-Omni, Qwen2.5-Coder model capabilities.

### Image Parameters
To control image resolution:
- `min_pixels`: Minimum number of pixels (e.g., 128*28*28)
- `max_pixels`: Maximum number of pixels (e.g., 768*28*28)

### Audio Parameters
- `enable_audio_output`: Set to true for audio generation, false to save 2GB GPU memory
- `spk`: Voice type ("Ethan" for male, "Chelsie" for female, default is Chelsie)

## Rate Limits
- Requests: Unlimited (internal use only)
- Concurrent connections: Up to 10 per client

## Error Codes
- `401` - Invalid API key
- `429` - Rate limit exceeded
- `500` - Internal server error
- `503` - Model temporarily unavailable

## Code Examples

### JavaScript/Node.js
```javascript
async function textGeneration(input) {
  const response = await fetch('https://getwinharris.github.io/bapXconnect/api/api/v1/text/generation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-DashScope-Token': 'getwinharris.github.io/bapXconnect/api'
    },
    body: JSON.stringify({
      model: 'qwen2.5-omni',
      input: input,
      parameters: {
        temperature: 0.7,
        max_tokens: 1024
      }
    })
  });

  const data = await response.json();
  return data.output.text;
}

// Usage
const input = {
  messages: [
    { role: 'user', content: 'Hello, how are you?' }
  ]
};

const response = await textGeneration(input);
console.log(response);
```

### Python
```python
import requests

def textGeneration(input_data):
    headers = {
        'Content-Type': 'application/json',
        'X-DashScope-Token': 'getwinharris.github.io/bapXconnect/api'
    }

    data = {
        'model': 'qwen2.5-omni',
        'input': input_data,
        'parameters': {
            'temperature': 0.7,
            'max_tokens': 1024
        }
    }

    response = requests.post(
        'https://getwinharris.github.io/bapXconnect/api/api/v1/text/generation',
        headers=headers,
        json=data
    )

    return response.json()['output']['text']

# Usage
input_data = {
    'messages': [
        {'role': 'user', 'content': 'Hello, how are you?'}
    ]
}

response = textGeneration(input_data)
print(response)
```

### cURL
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
          "content": "Hello, how are you?"
        }
      ]
    },
    "parameters": {
      "temperature": 0.7,
      "max_tokens": 1024
    }
  }'
```

## Connection to Qwen2.5-Omni, Qwen2.5-Coder Model
The API interfaces directly with the Qwen2.5-Omni, Qwen2.5-Coder model deployed on Oracle Cloud infrastructure:

```python
# Internal API implementation (handled by backend)
from transformers import Qwen2_5OmniForConditionalGeneration, Qwen2_5OmniProcessor

model = Qwen2_5OmniForConditionalGeneration.from_pretrained(
    "https://huggingface.co",
    dtype="auto",
    device_map="auto",
    enable_audio_output=True  # Enable audio output when needed
)
processor = Qwen2_5OmniProcessor.from_pretrained("https://huggingface.co")
```

## Session Management Integration
The API connects to the project-based session storage system:
- Session data stored in `Client Application Storage (varies by app)/`
- Integrates with `sessontree.json`, `todo.json`, and `.rag.json` for context continuity
- Maintains conversation history with UUIDs and parent-child relationships

## Security
- API key authentication via X-DashScope-Token header
- Individual API keys per client application (admin panel)
- All model connections are handled centrally
- SSL/TLS encryption for all communications