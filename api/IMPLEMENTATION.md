# bapX API Implementation

## Overview
The bapX API provides an interface to the Qwen2.5-Omni, Qwen2.5-Coder model, following the official implementation pattern from the Hugging Face transformers library.

## Model Integration
The API connects to the remote Qwen2.5-Omni, Qwen2.5-Coder model using the official transformers interface:

```python
from transformers import Qwen2_5OmniForConditionalGeneration, Qwen2_5OmniProcessor

model = Qwen2_5OmniForConditionalGeneration.from_pretrained(
    "https://huggingface.co",  # Remote model source
    dtype="auto",
    device_map="auto"
)
processor = Qwen2_5OmniProcessor.from_pretrained("https://huggingface.co")
```

## API Endpoints

### Text Generation
`POST /api/v1/text/generation`

This endpoint follows the Alibaba/DashScope API format and connects to the remote Qwen2.5-Omni, Qwen2.5-Coder model.

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

#### Implementation
Based on the official documentation, the API processes requests using the chat template:

```python
conversations = [
    {
        "role": "user",
        "content": [
            {"type": "text", "text": "Describe this image:"},
            {"type": "image", "image_url": "/path/to/image.jpg"}
        ]
    }
]

inputs = processor.apply_chat_template(
    conversations,
    load_audio_from_video=True,
    add_generation_prompt=True,
    tokenize=True,
    return_dict=True,
    return_tensors="pt",
    fps=1,
    padding=True,
    use_audio_in_video=True,
).to(model.device)

# Generation params for audio or text can be different and have to be prefixed with `thinker_` or `talker_`
text_ids = model.generate(**inputs, use_audio_in_video=False, thinker_do_sample=False)
text = processor.batch_decode(text_ids, skip_special_tokens=True, clean_up_tokenization_spaces=False)
```

### Model Information
`GET /api/v1/models`

Returns information about the loaded Qwen2.5-Omni, Qwen2.5-Coder model.

### Token Counting
`POST /api/v1/text/tokenize`

Counts tokens in a conversation using the model's tokenizer.

## Thinker-Talker Architecture
The Qwen2.5-Omni, Qwen2.5-Coder model uses a unique Thinker-Talker architecture:

- **Thinker**: Processes multimodal inputs and generates text responses
- **Talker**: Generates speech from text when audio output is requested

This is reflected in the model implementation:
- `Qwen2_5OmniThinkerForConditionalGeneration` for text-only generation
- `Qwen2_5OmniForConditionalGeneration` for combined text and audio generation

## Multimodal Support
The API supports all modalities supported by the Qwen2.5-Omni, Qwen2.5-Coder model:
- Text
- Images
- Audio
- Video

## Session Management
The API integrates with the project-based session system:
- `sessontree.json` - conversation history with UUIDs and parent-child relationships
- `todo.json` - task management and context
- `.rag.json` - knowledge base for retrieval-augmented generation

## Configuration
The API is configured to work with remote model sources from Hugging Face and follows the official implementation guidelines from the documentation.

## Audio Output
When audio output is required, the system prompt must include:
"You are Qwen, a virtual human developed by the Qwen Team, Alibaba Group, capable of perceiving auditory and visual inputs, as well as generating text and speech."

The model supports voice selection with the `spk` parameter ("Chelsie" or "Ethan").