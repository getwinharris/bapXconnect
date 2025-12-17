
# Product-Specific API Key Generation

The admin panel allows generating API keys tailored to specific products/website with the following features:

## Key Creation Process
1. Login to admin panel at http://getwinharris.github.io/bapXconnect/admin
2. Enter your product/website name
3. Select the model (Qwen2.5-Omni, Qwen2.5-Coder, or Qwen3-Omni-30B-A3B-Instruct)
4. Generate the API key
5. Copy the key using the provided copy button

## Key Format
Generated API keys follow the format:
```
bapX_[product-name]_[random-string]_[timestamp]
```

## Authentication
API keys are used in the header:
```
X-DashScope-Token: [generated-api-key]
```

## Session Management
Each API key maintains its own session memory in the user's device:
- Path: `Client Application Storage (varies by app)/[product-name]/`
- Files created: `sessontree.json`, `todo.json`, `.rag.json`
- Context continuity across sessions for each product using the same API key

## Model Capabilities
- **Qwen2.5-Omni**: Multimodal processing (text, image, audio, video) with streaming text and speech output
- **Qwen2.5-Coder**: Specialized coding model with 128K context length, code generation and reasoning
- **Qwen3-Omni-30B-A3B-Instruct**: Advanced multimodal with 119 text languages, 19 speech input languages, 10 speech output languages

## RAG Integration
- Each product's API key maintains its own RAG knowledge base
- Context retrieval happens based on the product-specific session
- Memory persists on the user device for continuity

## Runtime Session
- Sessions are maintained per product endpoint
- API keys connect to the specific model selected during generation
- Session context flows between the connected product and the model

