#!/usr/bin/env python3
"""
bapXconnect API Sandbox - Python Version
This script runs a minimal Flask server to enable API endpoints for the frontend
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import sys
import json
from datetime import datetime
import time

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Global configuration
API_KEY = "getwinharris.github.io/bapXconnect/api"
API_BASE_URL = "/api/v1"


class BapXPythonSandbox:
    def __init__(self):
        self.setup_routes()
    
    def setup_routes(self):
        # Serve static files (frontend)
        @app.route('/')
        def serve_index():
            return send_from_directory('.', 'index.html')
        
        @app.route('/api/<path:path>')
        def serve_api_static(path):
            return send_from_directory('api', path)
        
        @app.route('/ui/<path:path>')
        def serve_ui_static(path):
            return send_from_directory('api/ui', path)
        
        # Main API endpoint for text generation
        @app.route(f'{API_BASE_URL}/text/generation', methods=['POST'])
        def handle_text_generation():
            return self.handle_text_generation_request()
        
        # Models endpoint
        @app.route(f'{API_BASE_URL}/models', methods=['GET'])
        def handle_models():
            return self.handle_models_request()
        
        # Tokenize endpoint
        @app.route(f'{API_BASE_URL}/text/tokenize', methods=['POST'])
        def handle_tokenize():
            return self.handle_tokenize_request()
        
        # Health check
        @app.route('/health', methods=['GET'])
        def health_check():
            return jsonify({
                'status': 'ok', 
                'service': 'bapXconnect API',
                'timestamp': datetime.utcnow().isoformat()
            })
        
        # Fallback route to serve index for any unmatched routes
        @app.route('/<path:subpath>', defaults={'path': ''})
        @app.route('/<path:path>')
        def catch_all(path=''):
            return send_from_directory('.', 'index.html')

    def handle_text_generation_request(self):
        try:
            # Get request data
            data = request.get_json()
            model = data.get('model', 'qwen2.5-omni')
            input_data = data.get('input', {})
            parameters = data.get('parameters', {})
            
            # Validate API key
            token = request.headers.get('X-DashScope-Token')
            if token != API_KEY:
                return jsonify({'error': 'Invalid API key'}), 401
            
            print(f"[sandbox.py] Processing request for model: {model}")
            
            # Extract messages from input
            messages = input_data.get('messages', [])
            
            # Get the last message as the prompt
            if messages:
                last_message = messages[-1]
                if isinstance(last_message.get('content'), str):
                    prompt = last_message['content']
                elif isinstance(last_message.get('content'), list):
                    # Handle structured content
                    content_parts = []
                    for part in last_message['content']:
                        if part.get('type') == 'text':
                            content_parts.append(part.get('text', ''))
                        elif part.get('type') == 'image_url':
                            content_parts.append("[Image attached]")
                        elif part.get('type') == 'audio_url':
                            content_parts.append("[Audio attached]")
                    prompt = ' '.join(content_parts)
                else:
                    prompt = str(last_message.get('content', ''))
            else:
                prompt = "Hello, how can I help you?"
            
            # Call Hugging Face API simulation
            hf_response = self.call_hugging_face_api(model, prompt, parameters)
            
            return jsonify({
                'request_id': f'req-{int(time.time()*1000)}',
                'output': {
                    'text': hf_response.get('response', 'Response from Hugging Face model')
                },
                'usage': {
                    'prompt_tokens': len(prompt),
                    'completion_tokens': len(hf_response.get('response', '')),
                    'total_tokens': len(prompt) + len(hf_response.get('response', '')),
                    'finish_reason': 'stop'
                }
            })
        
        except Exception as e:
            print(f'[sandbox.py] Error in text generation: {str(e)}')
            return jsonify({
                'code': 'INTERNAL_ERROR',
                'message': str(e)
            }), 500

    def call_hugging_face_api(self, model, prompt, parameters=None):
        """Simulate calling Hugging Face API - in real implementation this would make actual API calls"""
        if parameters is None:
            parameters = {}
        
        # Model mapping
        model_map = {
            'qwen3-omni-30b-a3b-instruct': 'Qwen/Qwen3-Omni-30B-A3B-Instruct',
            'qwen2.5-omni': 'Qwen/Qwen2.5-Omni-7B',
            'qwen2.5-coder': 'Qwen/Qwen2.5-Coder-7B-Instruct',
            'llama3': 'meta-llama/Meta-Llama-3-8B-Instruct',
        }
        
        hf_model = model_map.get(model, model_map['qwen2.5-omni'])  # default to qwen2.5-omni
        
        print(f"[sandbox.py] Calling Hugging Face API for: {hf_model} with prompt:", prompt)
        
        # Simulate API call delay
        time.sleep(0.5)
        
        response_text = (
            f"This is a simulated response from model {model}. "
            f"Actual response would come from Hugging Face model: {hf_model}. "
            f"Prompt was: '{prompt}'."
        )
        
        return {'response': response_text}

    def handle_models_request(self):
        return jsonify({
            'object': 'list',
            'data': [
                {
                    'id': 'qwen3-omni-30b-a3b-instruct',
                    'object': 'model',
                    'created': int(time.time()),
                    'owned_by': 'bapXconnect'
                },
                {
                    'id': 'qwen2.5-omni',
                    'object': 'model',
                    'created': int(time.time()),
                    'owned_by': 'bapXconnect'
                },
                {
                    'id': 'qwen2.5-coder',
                    'object': 'model',
                    'created': int(time.time()),
                    'owned_by': 'bapXconnect'
                },
                {
                    'id': 'llama3',
                    'object': 'model',
                    'created': int(time.time()),
                    'owned_by': 'bapXconnect'
                }
            ]
        })

    def handle_tokenize_request(self):
        try:
            data = request.get_json()
            input_data = data.get('input', {})
            messages = input_data.get('messages', [])
            
            # Simple token count simulation
            text = ' '.join([
                str(msg.get('content')) if isinstance(msg.get('content'), str) 
                else json.dumps(msg.get('content', {}))
                for msg in messages
            ])
            token_count = len(text) // 4  # Rough estimate: 1 token ~ 4 characters

            return jsonify({
                'request_id': f'tok-{int(time.time()*1000)}',
                'count': token_count,
                'max_tokens': 32768
            })
        
        except Exception as e:
            return jsonify({
                'error': str(e)
            }), 500

    def start(self, host='0.0.0.0', port=5000):
        print(f"🚀 bapXconnect Python Sandbox Server running at http://{host}:{port}")
        print(f"📋 API endpoint: http://{host}:{port}{API_BASE_URL}/text/generation")
        print(f"🔗 Frontend available at: http://{host}:{port}/")
        print(f"🔑 API key: X-DashScope-Token: {API_KEY}")
        
        app.run(host=host, port=port, debug=True)


# Start the server if this file is run directly
if __name__ == '__main__':
    print("🔄 Starting bapXconnect API Python Sandbox...")
    print("🔧 This sandbox provides API endpoints for the frontend UI")
    
    sandbox = BapXPythonSandbox()
    
    port = int(os.environ.get('PORT', 5000))
    sandbox.start(port=port)