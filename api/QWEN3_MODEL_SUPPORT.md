# bapXconnect API - Supporting Multiple Qwen Models

## Available Models

### Qwen2.5-Omni (Legacy)
- Model ID: `qwen2.5-omni-local`
- Parameters: 7B
- Modalities: Text, Image, Audio, Video

### Qwen2.5-Coder
- Model ID: `qwen2.5-coder-local`  
- Parameters: 3B
- Specialization: Code generation and understanding

### Qwen3-Omni-30B-A3B (Latest)
- Model ID: `qwen3-omni-30b-a3b-instruct`
- Parameters: 30B total (MoE architecture)
- Architecture: Thinker-Talker with AuT pretraining
- Modalities: Text, Image, Audio, Video
- Languages: 119 text, 19 speech input, 10 speech output
- Features: Real-time streaming, natural speech output

## API Endpoints

Same base URL for all models: `https://getwinharris.github.io/bapXcoder/api/v1`

### Chat Completions
```bash
POST /v1/chat/completions
```

Example request:
```json
{
  "model": "qwen3-omni-30b-a3b-instruct",
  "messages": [
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "Analyze this video:"},
        {"type": "video_url", "video_url": {"url": "data:video/mp4;base64,..."}}  
      ]
    }
  ],
  "temperature": 0.7,
  "max_tokens": 2048
}
```

## Model Selection

Admins can generate API keys for specific models through the admin panel:
1. Navigate to: http://getwinharris.github.io/bapXconnect/admin
2. Login: getwinharris@gmail.com / bapX2025#
3. Select model from dropdown (qwen2.5-omni, qwen2.5-coder, qwen3-omni-30b-a3b)
4. Enter product/website name
5. Generate API key
6. Copy key with copy button

## Session Management

All models use the same project-based session system:
- Sessions stored in: `Client Application Storage (varies by app)/`
- Files: `sessontree.json`, `todo.json`, `.rag.json`
- Each project maintains its own context independently
- Context continuity across app restarts

## Multimodal Capabilities

### Qwen3-Omni Specific Features:
- Supports 119 text languages
- 19 speech input languages
- 10 speech output languages
- Real-time audio/video interaction
- Natural turn-taking in conversations
- Immediate text and speech responses
- Audio-visual question answering

### Audio Generation:
For audio output, include in system prompt:
```
You are Qwen, a virtual human developed by the Qwen Team, Alibaba Group, 
capable of perceiving auditory and visual inputs, as well as generating 
text and speech.
```

Then use:
```javascript
// In requests
const response = await fetch(API_URL, {
  // ... other options
  spk: "Ethan"  // or "Chelsie" for voice selection
});
```