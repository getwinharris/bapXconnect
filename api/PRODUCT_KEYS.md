
# Product-Specific API Key Generation

The admin panel allows generating API keys tailored to specific products/website with the following features:

## Key Creation Process
1. Login to admin panel at http://getwinharris.github.io/bapXconnect/admin
2. Enter your product/website name
3. Select the model (Qwen2.5-Omni or Qwen2.5-Coder)
4. Generate the API key
5. Copy the key using the provided copy button

## Key Format
Generated API keys follow the format:
```
bapX_[product-name]_[random-string]_[timestamp]
```

## Session Management
Each API key maintains its own session memory in the user's device:
- Path: `Client Application Storage/[product-name]/`
- Files created: `sessontree.json`, `todo.json`, `.rag.json`
- Context continuity across sessions for each product using the same API key

## RAG Integration
- Each product's API key maintains its own RAG knowledge base
- Context retrieval happens based on the product-specific session
- Memory persists on the user device for continuity

## Runtime Session
- Sessions are maintained per product endpoint
- API keys connect to the specific model selected during generation
- Session context flows between the connected product and the model

