# API to Qwen2.5-Omni, Qwen2.5-Coder Model Connection Guide

## Overview
This document details how the bapX API connects to the Qwen2.5-Omni, Qwen2.5-Coder model deployed on Oracle Cloud infrastructure. The API acts as an intermediary layer between client applications and the local model.

## Architecture Diagram
```
Client Applications 
        ↓ (HTTP/S requests)
    bapX API Server
        ↓ (Direct model access)
    Qwen2.5-Omni, Qwen2.5-Coder Model (Oracle Cloud)
```

## Connection Flow

### 1. Client Request
A client application makes a request to the API:

```bash
POST https://getwinharris.github.io/bapXcoder/api/v1/chat/completions
Authorization: Bearer getwinharris.github.io/bapXcoder/api
Content-Type: application/json

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

### 2. API Processing
The API server:
1. Validates the API key
2. Transforms the OpenAI-compatible request to Qwen2.5-Omni, Qwen2.5-Coder format
3. Passes the request to the local model

### 3. Model Processing
The model processes the request using the official transformers interface:

```python
# Internal implementation in API server
from transformers import Qwen2_5OmniForConditionalGeneration, Qwen2_5OmniProcessor
import torch

model = Qwen2_5OmniForConditionalGeneration.from_pretrained(
    "/oracle/models/qwen2.5-omni/",  # Local path on Oracle
    torch_dtype=torch.float16,  # Or torch.bfloat16
    device_map="auto",  # Automatic GPU assignment
    # To save ~2GB GPU memory if audio output not needed:
    # enable_audio_output=False
)
processor = Qwen2_5OmniProcessor.from_pretrained("/oracle/models/qwen2.5-omni/")

# Apply chat template for proper formatting
inputs = processor.apply_chat_template(
    conversations,  # Transformed from API request
    load_audio_from_video=True,
    add_generation_prompt=True,
    tokenize=True,
    return_dict=True,
    return_tensors="pt",
    fps=1,
    padding=True,
    use_audio_in_video=True,
).to(model.device)

# Generate response using the official model interface
generated_ids = model.generate(
    **inputs,
    # Prefix generation params with 'thinker_' or 'talker_' as needed
    thinker_temperature=0.7,
    max_new_tokens=1024,
    use_cache=True
)

# Decode the response
generated_ids_trimmed = generated_ids[:, inputs['input_ids'].shape[1]:]
response = processor.batch_decode(
    generated_ids_trimmed, 
    skip_special_tokens=True, 
    clean_up_tokenization_spaces=False
)[0]
```

### 4. Response Formatting
The API formats the model output back to OpenAI-compatible format and returns to the client.

## Code Examples: API Implementation

### Basic Model Interface
```python
# server_model_interface.py
from transformers import Qwen2_5OmniForConditionalGeneration, Qwen2_5OmniProcessor
import torch

class Qwen25OmniModelInterface:
    def __init__(self, model_path="/oracle/models/qwen2.5-omni/"):
        """
        Initialize the Qwen2.5-Omni, Qwen2.5-Coder model interface
        Based on official documentation: 
        https://huggingface.co/docs/transformers/main/en/model_doc/qwen2_5_omni
        """
        self.model = Qwen2_5OmniForConditionalGeneration.from_pretrained(
            model_path,
            torch_dtype=torch.float16,  # or torch.bfloat16
            device_map="auto",  # Automatically use available GPUs
            # To save ~2GB GPU memory if audio output not needed:
            # enable_audio_output=False
        )
        self.processor = Qwen2_5OmniProcessor.from_pretrained(model_path)
        
    def generate_response(self, messages, **generation_kwargs):
        """
        Generate a response using the official model interface
        
        Args:
            messages: List of message dictionaries in OpenAI format
            **generation_kwargs: Additional generation parameters
            
        Returns:
            Generated text response
        """
        # Convert OpenAI format to Qwen2.5-Omni, Qwen2.5-Coder format
        conversations = self.convert_messages_format(messages)
        
        # Apply chat template as per official documentation
        inputs = self.processor.apply_chat_template(
            conversations,
            load_audio_from_video=True,
            add_generation_prompt=True,
            tokenize=True,
            return_dict=True,
            return_tensors="pt",
            padding=True,
            use_audio_in_video=True,
        ).to(self.model.device)
        
        # Generate response using the model
        with torch.no_grad():
            generated_ids = self.model.generate(
                **inputs,
                # Prefix generation params with 'thinker_' or 'talker_' as needed
                thinker_temperature=generation_kwargs.get('temperature', 0.7),
                max_new_tokens=generation_kwargs.get('max_tokens', 1024),
                use_cache=True
            )
        
        # Process the output
        generated_ids_trimmed = generated_ids[:, inputs['input_ids'].shape[1]:]
        response_text = self.processor.batch_decode(
            generated_ids_trimmed, 
            skip_special_tokens=True, 
            clean_up_tokenization_spaces=False
        )[0]
        
        return response_text

    def convert_messages_format(self, openai_messages):
        """
        Convert OpenAI format messages to Qwen2.5-Omni, Qwen2.5-Coder format
        """
        qwen_conversations = []
        
        for msg in openai_messages:
            role = msg['role']
            content = msg['content']
            
            # Handle both string content and structured content
            if isinstance(content, str):
                qwen_conversations.append({
                    "role": role,
                    "content": [
                        {"type": "text", "text": content}
                    ]
                })
            elif isinstance(content, list):
                # Already in structured format
                qwen_conversations.append({
                    "role": role,
                    "content": content
                })
        
        return qwen_conversations
```

### API Request Handler
```python
# api_handler.py
from flask import Flask, request, jsonify
import logging

app = Flask(__name__)
model_interface = Qwen25OmniModelInterface()

@app.route('/v1/chat/completions', methods=['POST'])
def chat_completions():
    """
    Handle chat completion requests
    """
    try:
        # Parse the request
        req_data = request.get_json()
        
        # Validate the request
        if not req_data.get('messages'):
            return jsonify({'error': 'messages are required'}), 400
            
        # Extract parameters
        messages = req_data['messages']
        model = req_data.get('model', 'qwen2.5-omni-local')
        temperature = req_data.get('temperature', 0.7)
        max_tokens = req_data.get('max_tokens', 1024)
        
        # Generate response from local model
        response_text = model_interface.generate_response(
            messages,
            temperature=temperature,
            max_tokens=max_tokens
        )
        
        # Format response in OpenAI-compatible format
        response = {
            "id": f"chat-{hash(response_text)}",
            "object": "chat.completion",
            "created": int(time.time()),
            "model": model,
            "choices": [
                {
                    "index": 0,
                    "message": {
                        "role": "assistant",
                        "content": response_text
                    },
                    "finish_reason": "stop"
                }
            ],
            "usage": {
                "prompt_tokens": len(str(messages)),
                "completion_tokens": len(response_text),
                "total_tokens": len(str(messages)) + len(response_text)
            }
        }
        
        return jsonify(response)
        
    except Exception as e:
        logging.error(f"Error processing request: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500
```

## Multimodal Processing

### Text Processing
```python
conversations = [
    {
        "role": "system",
        "content": [
            {"type": "text", "text": "You are Qwen, a virtual human developed by the Qwen Team, Alibaba Group, capable of perceiving auditory and visual inputs, as well as generating text and speech."}
        ],
    },
    {
        "role": "user",
        "content": [
            {"type": "text", "text": "Explain the concept of neural networks."}
        ],
    },
]
```

### Image Processing
```python
conversations = [
    {
        "role": "user",
        "content": [
            {"type": "image", "image_url": "/path/to/image.jpg"},
            {"type": "text", "text": "What can you see in this image?"}
        ],
    },
]
```

### Audio Processing
```python
conversations = [
    {
        "role": "user",
        "content": [
            {"type": "audio", "audio_url": "/path/to/audio.wav"},
            {"type": "text", "text": "What is this audio about?"}
        ],
    },
]
```

### Video Processing
```python
conversations = [
    {
        "role": "user", 
        "content": [
            {"type": "video", "video_url": "/path/to/video.mp4"},
            {"type": "text", "text": "What can you hear and see in this video?"}
        ],
    },
]
```

## Audio Generation
When audio output is needed, ensure proper system prompt:

```python
conversations = [
    {
        "role": "system", 
        "content": [
            {"type": "text", "text": "You are Qwen, a virtual human developed by the Qwen Team, Alibaba Group, capable of perceiving auditory and visual inputs, as well as generating text and speech."}
        ],
    },
    # ... other messages
]
```

Use the talker component for audio generation:
```python
# Generate both text and audio
text_ids, audio = model.generate(**inputs, use_audio_in_video=True, thinker_do_sample=False, talker_do_sample=True)

# Save audio output
import soundfile as sf
sf.write(
    "output.wav",
    audio.reshape(-1).detach().cpu().numpy(),
    samplerate=24000,
)
```

## Session Integration
The API connects to the session management system to maintain context:

```python
# Example session integration
from session_manager import SessionManager

def chat_completions_with_session():
    # Get session context for current project
    session_manager = SessionManager(project_path=os.getcwd())
    session_context = session_manager.get_context_summary()
    
    # Include session context in system prompt
    system_message = {
        "role": "system",
        "content": f"Project context: {session_context}\n\n{default_system_prompt}"
    }
    
    # Process with model as before
    response = model_interface.generate_response([system_message] + user_messages)
    return response
```

## Error Handling
```python
try:
    response = model_interface.generate_response(messages)
except torch.cuda.OutOfMemoryError:
    # Handle GPU memory issues
    logging.warning("GPU memory exhausted, switching to CPU")
    model.to('cpu')
    response = model_interface.generate_response(messages)
except Exception as e:
    # Log error and return appropriate response
    logging.error(f"Model error: {str(e)}")
    return {"error": "Model temporarily unavailable"}
```

This implementation creates a complete bridge between the API endpoints and the Qwen2.5-Omni, Qwen2.5-Coder model, allowing client applications to interface with the powerful multimodal model in a standardized way.