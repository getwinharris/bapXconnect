
# Qwen3-Omni-30B-A3B Integration

## Model Overview
- Model: Qwen/Qwen3-Omni-30B-A3B-Instruct
- Architecture: Mixture of Experts (MoE) Thinker-Talker design with AuT pretraining
- Modalities: Text, Image, Audio, and Video with end-to-end processing
- Languages: 119 text languages, 19 speech input languages, 10 speech output languages
- Parameters: 30B total (Mixture of Experts architecture)

## API Configuration
- Base URL: https://getwinharris.github.io/bapXconnect/api
- Model identifier: qwen3-omni-30b-a3b-instruct
- API Key: Set in X-DashScope-Token header
- Endpoint: /api/v1/text/generation

## Implementation Notes
- Uses standard Qwen2_5OmniProcessor (backward compatible processing)
- Supports batch inference with configurable limit_mm_per_prompt parameter
- Implements chunking strategies for long video processing
- Uses TMRoPE (Time-aligned Multi-modal RoPE) for synchronized processing

## Runtime Requirements
- Minimum 78GB GPU memory for 15s video (BF16 precision)
- Recommended 145GB GPU memory for 120s video
- Multi-GPU supported via tensor_parallel_size
- Optimized for streaming inference with low latency

## Thinker-Talker Architecture
- **Thinker**: Large Language Model component for text processing and generation
- **Talker**: Dual-track autoregressive model generating audio tokens from Thinker's representations
- **Token2Wav**: Converts speech tokens to waveform using DiT + BigVGAN

## Voice Options
- **Chelsie**: Female voice (honeyed and velvety)
- **Ethan**: Male voice (bright and upbeat)
- **Aiden**: Male voice (warm and laid-back American accent)

## Session Management
Same project-based session system applies:
- Session storage: Client Application Storage (varies by app)/
- Files: sessontree.json, todo.json, .rag.json

