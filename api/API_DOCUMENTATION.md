# bapX API Documentation

## Overview
The bapX API provides a standardized interface to the Qwen2.5-Omni, Qwen2.5-Coder model deployed on Oracle Cloud infrastructure. The API follows OpenAI-compatible endpoints to facilitate easy integration with existing applications.

## Base URL
`https://getwinharris.github.io/bapXcoder/api`

## Authentication
Fixed API Key: `getwinharris.github.io/bapXcoder/api`

## Endpoints

### Chat Completion
`POST /v1/chat/completions`

#### Request
```json
{
  "model": "qwen2.5-omni-local",
  "messages": [
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "Hello, how are you?"}
      ]
    }
  ],
  "temperature": 0.7,
  "max_tokens": 1024
}
```

#### Response
```json
{
  "id": "chat-123456789",
  "object": "chat.completion",
  "created": 1234567890,
  "model": "qwen2.5-omni-local",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! I'm doing well, thank you for asking."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 15,
    "total_tokens": 25
  }
}
```

### Chat Completion with Images
`POST /v1/chat/completions`

#### Request
```json
{
  "model": "qwen2.5-omni-local",
  "messages": [
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "Describe this image:"},
        {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64,..."}}
      ]
    }
  ],
  "temperature": 0.7,
  "max_tokens": 1024
}
```

### Chat Completion with Audio
`POST /v1/chat/completions`

#### Request
```json
{
  "model": "qwen2.5-omni-local",
  "messages": [
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "What's in this audio?"},
        {"type": "audio_url", "audio_url": {"url": "data:audio/wav;base64,..."}}  
      ]
    }
  ],
  "temperature": 0.7,
  "max_tokens": 1024
}
```

### Chat Completion with Video
`POST /v1/chat/completions`

#### Request
```json
{
  "model": "qwen2.5-omni-local",
  "messages": [
    {
      "role": "user", 
      "content": [
        {"type": "text", "text": "What do you see in this video?"},
        {"type": "video_url", "video_url": {"url": "data:video/mp4;base64,..."}}  
      ]
    }
  ],
  "temperature": 0.7,
  "max_tokens": 1024
}
```

### Model Information
`GET /v1/models`

#### Response
```json
{
  "object": "list",
  "data": [
    {
      "id": "qwen2.5-omni-local",
      "object": "model",
      "created": 1234567890,
      "owned_by": "bapX"
    }
  ]
}
```

### Token Counting
`POST /v1/chat/tokenize`

#### Request
```json
{
  "model": "qwen2.5-omni-local",
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?"
    }
  ]
}
```

#### Response
```json
{
  "model": "qwen2.5-omni-local",
  "count": 10,
  "max_tokens": 32768
}
```

## Session Context
Each request can include session context to maintain continuity:

### Request with Session Context
```json
{
  "model": "qwen2.5-omni-local",
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
async function chatCompletion(messages) {
  const response = await fetch('https://getwinharris.github.io/bapXcoder/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer getwinharris.github.io/bapXcoder/api'
    },
    body: JSON.stringify({
      model: 'qwen2.5-omni-local',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1024
    })
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Usage
const messages = [
  { role: 'user', content: 'Hello, how are you?' }
];

const response = await chatCompletion(messages);
console.log(response);
```

### Python
```python
import requests

def chat_completion(messages):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer getwinharris.github.io/bapXcoder/api'
    }
    
    data = {
        'model': 'qwen2.5-omni-local',
        'messages': messages,
        'temperature': 0.7,
        'max_tokens': 1024
    }
    
    response = requests.post(
        'https://getwinharris.github.io/bapXcoder/api/v1/chat/completions',
        headers=headers,
        json=data
    )
    
    return response.json()['choices'][0]['message']['content']

# Usage
messages = [
    {'role': 'user', 'content': 'Hello, how are you?'}
]

response = chat_completion(messages)
print(response)
```

### cURL
```bash
curl -X POST https://getwinharris.github.io/bapXcoder/api/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer getwinharris.github.io/bapXcoder/api" \
  -d '{
    "model": "qwen2.5-omni-local",
    "messages": [
      {
        "role": "user",
        "content": "Hello, how are you?"
      }
    ],
    "temperature": 0.7,
    "max_tokens": 1024
  }'
```

## Connection to Qwen2.5-Omni, Qwen2.5-Coder Model
The API interfaces directly with the Qwen2.5-Omni, Qwen2.5-Coder model deployed on Oracle Cloud infrastructure:

```python
# Internal API implementation (handled by backend)
from transformers import Qwen2_5OmniForConditionalGeneration, Qwen2_5OmniProcessor

model = Qwen2_5OmniForConditionalGeneration.from_pretrained(
    "/oracle/models/qwen2.5-omni/",
    dtype="auto",
    device_map="auto",
    enable_audio_output=True  # Enable audio output when needed
)
processor = Qwen2_5OmniProcessor.from_pretrained("/oracle/models/qwen2.5-omni/")
```

## Session Management Integration
The API connects to the project-based session storage system:
- Session data stored in `Client Application Storage (varies by app)/`
- Integrates with `sessontree.json`, `todo.json`, and `.rag.json` for context continuity
- Maintains conversation history with UUIDs and parent-child relationships

## Security
- API key authentication required for all endpoints
- Internal use only - not exposed to public users
- Rate limiting implemented per client
- SSL/TLS encryption for all communications