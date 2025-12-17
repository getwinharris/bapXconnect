# bapXconnect API Specification

## Base URL
`https://getwinharris.github.io/bapXconnect/api/v1`

## Authentication
Fixed API Key: `getwinharris.github.io/bapXconnect/api`

## Endpoints

### Chat Completions
`POST /v1/chat/completions`

#### Request
```json
{
  "model": "string",
  "messages": [
    {
      "role": "string",
      "content": "string or array of content parts"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 1024
}
```

#### Response
```json
{
  "id": "string",
  "object": "chat.completion",
  "created": 1234567890,
  "model": "string",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "string"
      },
      "finish_reason": "string"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 50,
    "total_tokens": 60
  }
}
```

### Models
`GET /v1/models`

#### Response
```json
{
  "object": "list",
  "data": [
    {
      "id": "model-id",
      "object": "model",
      "created": 1234567890,
      "owned_by": "string"
    }
  ]
}
```

### Token Counting
`POST /v1/chat/tokenize`

#### Request
```json
{
  "model": "string",
  "messages": [
    {
      "role": "string",
      "content": "string or array of content parts"
    }
  ]
}
```

#### Response
```json
{
  "model": "string",
  "count": 123,
  "max_tokens": 32768
}
```

## Supported Models
- `qwen2.5-omni-local`
- `qwen2.5-coder-local`
- `qwen3-omni-30b-a3b-instruct`

## Model Routing
Currently routes to Hugging Face endpoints.
Future: Routes to bapX server

## Rate Limits
- Unlimited (for internal use)
- Connection-based throttling may apply based on model capacity

## Versioning
- API version: v1
- Current models: Based on Hugging Face Transformers interface
- Future models: Compatible with same API schema