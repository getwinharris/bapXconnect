
# Qwen3-Omni-30B-A3B Integration

## Model Overview
- Model: Qwen/Qwen3-Omni-30B-A3B-Instruct
- Architecture: MoE-based Thinker-Talker design with AuT pretraining
- Modalities: Text, Image, Audio, and Video
- Languages: 119 text, 19 speech input, 10 speech output languages
- Precision: 30B parameters total (A3B likely refers to audio aspects)

## API Configuration
- Base URL: http://localhost:8080/v1
- Model identifier: qwen3-omni-30b-a3b-instruct
- API Key: getwinharris.github.io/bapXcoder/api

## Implementation Notes
- Uses special processor: Qwen3OmniMoeProcessor
- Requires "qwen-omni-utils" for multimodal processing
- Supports batch inference with limit_mm_per_prompt parameter
- Uses FlashAttention 2 for reduced GPU memory

## Runtime Requirements
- Minimum 78GB GPU memory for 15s video
- BF16 precision recommended
- Multi-GPU supported via tensor_parallel_size

## Session Management
Same project-based session system applies:
- Session storage: Client Application Storage (varies by app)/
- Files: sessontree.json, todo.json, .rag.json

