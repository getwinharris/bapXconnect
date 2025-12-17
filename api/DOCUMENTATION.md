# bapXconnect API Documentation

## Overview
The bapXconnect API provides a universal interface to multiple AI models, with initial support for the Qwen2.5-Omni, Qwen2.5-Coder multimodal model. The API connects to Hugging Face hosted models and Oracle Cloud deployments.

## API Endpoints

### Base URL
`https://getwinharris.github.io/bapXcoder/api/v1`

### Authentication
Fixed API key: `getwinharris.github.io/bapXcoder/api`

### Chat Completions
`POST /chat/completions`

#### Request Format
```json
{
  "model": "qwen2.5-omni",
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

#### Response Format
```json
{
  "id": "chat-...",
  "object": "chat.completion",
  "created": 1234567890,
  "model": "qwen2.5-omni",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Response from model"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 100,
    "completion_tokens": 50,
    "total_tokens": 150
  }
}
```

## Model Configuration

The API connects to models hosted on Hugging Face:
- Qwen2.5-Omni, Qwen2.5-Coder: `@huggingface/qwen/models` (specifically `Qwen/Qwen2.5-Omni, Qwen2.5-Coder-7B`)
- Models are accessed via Hugging Face endpoints

## Session Management
Each project gets its own session storage in `Client Application Storage (varies by app)/` with:
- `sessontree.json` - conversation history with UUIDs and parent-child relationships
- `todo.json` - task management with context tracking
- `.rag.json` - retrieval-augmented generation knowledge base

## Key Generation
Admins can generate API keys for different models through the admin panel:
- Visit `http://getwinharris.github.io/bapXconnect/admin`
- Login: getwinharris@gmail.com / bapX2025#
- Select model and generate key for specific product/application

## API Usage Examples

### JavaScript
```javascript
const response = await fetch('https://getwinharris.github.io/bapXcoder/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer getwinharris.github.io/bapXcoder/api'
  },
  body: JSON.stringify({
    model: 'qwen2.5-omni',
    messages: [{ role: 'user', content: 'Hello!' }],
    temperature: 0.7
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);
```

### Python
```python
import requests

headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer getwinharris.github.io/bapXcoder/api'
}

data = {
    'model': 'qwen2.5-omni',
    'messages': [{'role': 'user', 'content': 'Hello!'}],
    'temperature': 0.7
}

response = requests.post('https://getwinharris.github.io/bapXcoder/api/v1/chat/completions', 
                        headers=headers, json=data)
print(response.json()['choices'][0]['message']['content'])
```

## Model Selection
The API supports multiple models:
1. **Qwen2.5-Omni, Qwen2.5-Coder** - General multimodal model
2. **Qwen2.5-Coder** - Specialized coding model
3. **Custom models** - Available through Oracle Cloud deployment

When generating an API key, administrators can specify which model the key should connect to.