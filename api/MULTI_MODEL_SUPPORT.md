
# API Endpoints for Multiple Models

The bapXconnect API supports multiple models with separate endpoints:

## Qwen2.5-Omni (Multimodal)
- Model: Qwen/Qwen2.5-Omni-7B
- Architecture: Thinker-Talker with 3584 hidden size, 28 layers
- Purpose: General multimodal processing (text, image, audio, video) with streaming text and speech output
- Key Features:
  - End-to-end processing of mixed modalities
  - Real-time streaming with natural turn-taking
  - 32K max context length
  - Voice options (Chelsie female, Ethan male)

## Qwen2.5-Coder (Coding Specialized)
- Model: Qwen/Qwen2.5-Coder-7B-Instruct
- Architecture: 7.61B parameters with 28 layers, 128K context length
- Purpose: Code generation, reasoning, fixing, and explanation
- Key Features:
  - 5.5T token training dataset
  - Enhanced mathematical reasoning
  - Real-world code application support
  - Instruction tuned for conversational assistance

## Qwen3-Omni-30B-A3B-Instruct (Advanced Multimodal)
- Model: Qwen/Qwen3-Omni-30B-A3B-Instruct
- Architecture: Mixture of Experts (MoE) with Thinker-Talker components
- Purpose: Advanced multimodal processing with multilingual support
- Key Features:
  - 119 text languages, 19 speech input languages, 10 speech output languages
  - State-of-the-art performance across 36 audio/video benchmarks
  - Real-time streaming with natural turn-taking
  - AuT pretraining for enhanced general representations

All models connect to Oracle Cloud infrastructure at 152.70.70.254 and accessed via the same API structure:
- Base URL: https://getwinharris.github.io/bapXconnect/api
- Auth: X-DashScope-Token getwinharris.github.io/bapXconnect/api
- Models endpoint: /api/v1/models
- Text generation: /api/v1/text/generation
- Token counting: /api/v1/text/tokenize

