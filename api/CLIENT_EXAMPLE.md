# Client Implementation Example

This file demonstrates how client applications (like the bapXcli) would connect to the bapX API.

## API Client Configuration
```python
# api_client.py
import requests
import json

class BapXApiClient:
    def __init__(self, base_url="https://getwinharris.github.io/bapXconnect/api", api_key="getwinharris.github.io/bapXconnect/api"):
        self.base_url = base_url
        self.headers = {
            "Content-Type": "application/json",
            "X-DashScope-Token": api_key,  # Alibaba-style API key header
            "User-Agent": "bapXcli/1.0"
        }

    def text_generation(self, input_data, model="qwen2.5-omni", **kwargs):
        """
        Send a text generation request to the bapX API (Alibaba/DashScope style)
        """
        url = f"{self.base_url}/api/v1/text/generation"

        payload = {
            "model": model,
            "input": input_data,
            "parameters": kwargs  # Additional parameters like temperature, max_tokens, etc.
        }

        response = requests.post(url, headers=self.headers, json=payload)
        response.raise_for_status()

        return response.json()

# Example usage:
client = BapXApiClient()

input_data = {
    "messages": [
        {
            "role": "system",
            "content": "You are Qwen, a virtual human developed by the Qwen Team, Alibaba Group, capable of perceiving auditory and visual inputs, as well as generating text and speech."
        },
        {
            "role": "user",
            "content": "Hello, how are you?"
        }
    ]
}

response = client.text_generation(input_data, temperature=0.7, max_tokens=1024)
print(response['output']['text'])
```

## Official Model Interface
The API backend would implement the official Hugging Face transformers interface as documented:

```python
# server_model_interface.py
from transformers import Qwen2_5OmniForConditionalGeneration, Qwen2_5OmniProcessor
import torch

class Qwen25OmniModelInterface:
    def __init__(self, model_source="https://huggingface.co"):
        """
        Initialize the Qwen2.5-Omni, Qwen2.5-Coder model interface
        Based on official documentation:
        https://huggingface.co/docs/transformers/main/en/model_doc/qwen2_5_omni
        """
        self.model = Qwen2_5OmniForConditionalGeneration.from_pretrained(
            model_source,
            torch_dtype=torch.float16,  # or torch.bfloat16
            device_map="auto",  # Automatically use available GPUs
            # To save ~2GB GPU memory if audio output not needed:
            # enable_audio_output=False
        )
        self.processor = Qwen2_5OmniProcessor.from_pretrained(model_source)

    def generate_response(self, messages, **generation_kwargs):
        """
        Generate a response using the official model interface
        """
        # Apply chat template
        inputs = self.processor.apply_chat_template(
            messages,
            add_generation_prompt=True,
            tokenize=True,
            return_dict=True,
            return_tensors="pt",
            padding=True
        ).to(self.model.device)

        # Generate response
        with torch.no_grad():
            generated_ids = self.model.generate(
                **inputs,
                # Prefix generation params with 'thinker_' or 'talker_' as needed
                thinker_temperature=generation_kwargs.get('temperature', 0.7),
                max_new_tokens=generation_kwargs.get('max_tokens', 1024),
                use_cache=True
            )

        # Decode response
        generated_ids_trimmed = generated_ids[:, inputs['input_ids'].shape[1]:]
        response_text = self.processor.batch_decode(
            generated_ids_trimmed,
            skip_special_tokens=True,
            clean_up_tokenization_spaces=False
        )[0]

        return response_text
```

## Integration with Session Management
The API integrates with the project-based session system:

```python
# session_integration.py
import json
import os
from pathlib import Path

class SessionManager:
    def __init__(self, project_path):
        self.project_dir = Path.home() / "Client Application Storage (varies by app)" / Path(project_path).name
        self.project_dir.mkdir(parents=True, exist_ok=True)

    def save_session_tree(self, session_data):
        """Save conversation history to sessontree.json"""
        with open(self.project_dir / "sessontree.json", "w") as f:
            json.dump(session_data, f, indent=2)

    def save_todo_list(self, todo_data):
        """Save tasks to todo.json"""
        with open(self.project_dir / "todo.json", "w") as f:
            json.dump(todo_data, f, indent=2)

    def save_rag_storage(self, rag_data):
        """Save RAG data to .rag.json"""
        with open(self.project_dir / ".rag.json", "w") as f:
            json.dump(rag_data, f, indent=2)

    def load_project_context(self):
        """Load all project context for API requests"""
        context = {}

        # Load session tree if exists
        sessontree_path = self.project_dir / "sessontree.json"
        if sessontree_path.exists():
            with open(sessontree_path, "r") as f:
                context['session_tree'] = json.load(f)

        # Load todo list if exists
        todo_path = self.project_dir / "todo.json"
        if todo_path.exists():
            with open(todo_path, "r") as f:
                context['todo_list'] = json.load(f)

        # Load RAG data if exists
        rag_path = self.project_dir / ".rag.json"
        if rag_path.exists():
            with open(rag_path, "r") as f:
                context['rag_storage'] = json.load(f)

        return context
```

This demonstrates how the API connects to the remote model using the official implementation pattern, while providing an Alibaba/DashScope-compatible interface for client applications.