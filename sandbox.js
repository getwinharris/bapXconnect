/**
 * bapXconnect API Gateway - Complete Server Implementation
 * 
 * This server provides:
 * - Main chat UI with model selection and profile settings
 * - Admin panel for API key generation and model configuration
 * - Session history sidebar
 * - RAG memory integration
 * - Client app runtime management
 * 
 * Designed to run in GitHub cloud environment (Codespaces or similar)
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

// Define __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, '.')));

// In-memory storage (would use DB in production)
let apiKeys = JSON.parse(process.env.API_KEYS || '[]') || [];
let sessions = {};
let ragMemory = {};

// Generate a new API key
function generateApiKey(productName = 'unnamed-app') {
  const randomPart = crypto.randomBytes(16).toString('hex');
  const timestamp = Date.now().toString(36);
  return `bapX_${productName}_${randomPart.substring(0, 8)}_${timestamp}`;
}

// Validate API key
function isValidApiKey(key) {
  return apiKeys.some(k => k.key === key && k.status === 'active');
}

// Hugging Face model mappings
const MODEL_ENDPOINTS = {
  'qwen3-omni-30b-a3b-instruct': 'Qwen/Qwen3-Omni-30B-A3B-Instruct',
  'qwen2.5-omni': 'Qwen/Qwen2.5-Omni-7B',
  'qwen2.5-coder': 'Qwen/Qwen2.5-Coder-7B-Instruct',
  'llama3': 'meta-llama/Meta-Llama-3-8B-Instruct',
};

// Main text generation endpoint
app.post('/api/v1/text/generation', async (req, res) => {
  const authHeader = req.headers['x-dashscope-token'] || req.headers['authorization'];
  const apiKey = authHeader?.replace('Bearer ', '') || authHeader;
  
  if (!apiKey || !isValidApiKey(apiKey)) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  const { model, input, parameters = {} } = req.body;
  
  if (!MODEL_ENDPOINTS[model]) {
    return res.status(400).json({ error: `Model ${model} not supported` });
  }

  const messages = input.messages || [];
  const lastMessage = messages[messages.length - 1]?.content || 'Hello';

  // Simulate response (in real implementation would connect to model)
  const hfModel = MODEL_ENDPOINTS[model];
  const simulatedResponse = `Response from model: ${model} (${hfModel})

Input: ${lastMessage}

In live implementation:
- Connects to: https://huggingface.co/${hfModel}
- Uses parameters: ${JSON.stringify(parameters)}
- Processes with: ${hfModel}

This response confirms your API key is working correctly.`;

  res.json({
    request_id: `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    output: {
      text: simulatedResponse
    },
    usage: {
      prompt_tokens: lastMessage.length,
      completion_tokens: simulatedResponse.length,
      total_tokens: lastMessage.length + simulatedResponse.length,
      finish_reason: 'stop'
    }
  });
});

// Models endpoint
app.get('/api/v1/models', (req, res) => {
  const authHeader = req.headers['x-dashscope-token'] || req.headers['authorization'];
  const apiKey = authHeader?.replace('Bearer ', '') || authHeader;
  
  if (!apiKey || !isValidApiKey(apiKey)) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  res.json({
    object: 'list',
    data: Object.keys(MODEL_ENDPOINTS).map(modelId => ({
      id: modelId,
      object: 'model',
      created: Date.now(),
      owned_by: 'bapXconnect'
    }))
  });
});

// Token counting endpoint
app.post('/api/v1/text/tokenize', (req, res) => {
  const authHeader = req.headers['x-dashscope-token'] || req.headers['authorization'];
  const apiKey = authHeader?.replace('Bearer ', '') || authHeader;
  
  if (!apiKey || !isValidApiKey(apiKey)) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  const { input } = req.body;
  const messages = input.messages || [];
  const text = messages.map(msg => msg.content || '').join(' ');
  const tokenCount = Math.ceil(text.length / 4);

  res.json({
    request_id: `tok-${Date.now()}`,
    count: tokenCount,
    max_tokens: 32768
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'bapXconnect API Gateway',
    models: Object.keys(MODEL_ENDPOINTS),
    timestamp: new Date().toISOString()
  });
});

// Admin authentication middleware
function adminAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ error: 'Basic auth required' });
  }
  
  const base64Credentials = auth.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  
  if (username === 'getwinharris' && password === 'bapX2025#') {
    next();
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
}

// Admin routes
app.get('/admin/apikeys', adminAuth, (req, res) => {
  res.json({ keys: apiKeys });
});

app.post('/admin/apikeys', adminAuth, (req, res) => {
  const { product, model } = req.body;
  const newKey = {
    key: generateApiKey(product || 'app'),
    product: product || 'unnamed-app',
    model: model || 'qwen2.5-omni',
    createdAt: new Date().toISOString(),
    status: 'active',
    usage: 0
  };
  
  apiKeys.push(newKey);
  res.json(newKey);
});

app.delete('/admin/apikeys/:key', adminAuth, (req, res) => {
  const keyToDelete = req.params.key;
  apiKeys = apiKeys.filter(k => k.key !== keyToDelete);
  res.json({ success: true });
});

// Admin panel UI
app.get('/admin', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>bapXconnect Admin Panel</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background: linear-gradient(135deg, #0f172a 0%, #1a1a2e 100%);
            color: #e6e6e6;
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #4361ee;
            margin-bottom: 30px;
        }

        .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            font-size: 2rem;
            color: #4cc9f0;
        }

        .admin-dashboard {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 20px;
        }

        .sidebar {
            background: rgba(25, 50, 60, 0.8);
            border-radius: 10px;
            padding: 20px;
            border: 1px solid #4361ee;
        }

        .sidebar h3 {
            color: #4cc9f0;
            margin-bottom: 20px;
        }

        .nav-item {
            padding: 12px 15px;
            margin-bottom: 8px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .nav-item:hover, .nav-item.active {
            background: rgba(76, 201, 240, 0.2);
            border-left: 3px solid #4cc9f0;
        }

        .nav-item i {
            width: 20px;
        }

        .main-content {
            background: rgba(15, 23, 42, 0.8);
            border-radius: 10px;
            padding: 30px;
            border: 1px solid #4361ee;
        }

        .section {
            display: none;
        }

        .section.active {
            display: block;
        }

        .section h2 {
            color: #4cc9f0;
            margin-bottom: 20px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            color: #a9d6e5;
        }

        input, select, textarea {
            width: 100%;
            padding: 12px;
            border-radius: 5px;
            border: 1px solid #4361ee;
            background: rgba(25, 50, 60, 0.8);
            color: white;
            font-size: 1rem;
        }

        .btn {
            padding: 12px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            margin-right: 10px;
        }

        .primary-btn {
            background: linear-gradient(90deg, #4361ee, #3a0ca3);
            color: white;
        }

        .primary-btn:hover {
            background: linear-gradient(90deg, #3a0ca3, #7209b7);
        }

        .secondary-btn {
            background: rgba(100, 100, 140, 0.5);
            color: #a9d6e5;
        }

        .secondary-btn:hover {
            background: rgba(100, 100, 140, 0.8);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #4361ee;
        }

        th {
            background: rgba(67, 97, 238, 0.2);
            color: #4cc9f0;
        }

        .key-cell {
            font-family: monospace;
            word-break: break-all;
        }

        .model-config {
            background: rgba(76, 201, 240, 0.1);
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }

        .documentation {
            background: rgba(50, 50, 70, 0.7);
            padding: 20px;
            border-radius: 8px;
            margin-top: 30px;
        }

        .documentation h3 {
            color: #f72585;
            margin-bottom: 15px;
        }

        .documentation ul {
            padding-left: 20px;
        }

        .documentation li {
            margin-bottom: 10px;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <i class="fas fa-shield-alt"></i>
                <span>Admin Panel - bapXconnect</span>
            </div>
            <p>Manage API keys, configure models, and client applications</p>
        </div>

        <div class="admin-dashboard">
            <div class="sidebar">
                <h3>Navigation</h3>
                <div class="nav-item active" onclick="showSection('overview')">
                    <i class="fas fa-home"></i> Overview
                </div>
                <div class="nav-item" onclick="showSection('apikeys')">
                    <i class="fas fa-key"></i> API Keys
                </div>
                <div class="nav-item" onclick="showSection('models')">
                    <i class="fas fa-microchip"></i> Model Config
                </div>
                <div class="nav-item" onclick="showSection('clients')">
                    <i class="fas fa-users"></i> Client Apps
                </div>
                <div class="nav-item" onclick="showSection('integration')">
                    <i class="fas fa-plug"></i> Integration Guide
                </div>
            </div>

            <div class="main-content">
                <!-- Overview Section -->
                <div id="overview" class="section active">
                    <h2>System Overview</h2>
                    <p>Welcome to the bapXconnect Admin Panel. Manage your API keys and configure your system.</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 30px;">
                        <div style="background: rgba(67, 97, 238, 0.2); padding: 20px; border-radius: 8px; border-left: 3px solid #4cc9f0;">
                            <h3 style="color: #4cc9f0;">Total API Keys</h3>
                            <p id="total-keys">0</p>
                        </div>
                        <div style="background: rgba(247, 37, 133, 0.2); padding: 20px; border-radius: 8px; border-left: 3px solid #f72585;">
                            <h3 style="color: #f72585;">Models Available</h3>
                            <p id="total-models">0</p>
                        </div>
                        <div style="background: rgba(76, 201, 240, 0.2); padding: 20px; border-radius: 8px; border-left: 3px solid #4cc9f0;">
                            <h3 style="color: #4cc9f0;">Active Connections</h3>
                            <p id="active-connections">0</p>
                        </div>
                    </div>
                </div>

                <!-- API Keys Section -->
                <div id="apikeys" class="section">
                    <h2>API Key Management</h2>
                    <p>Create and manage API keys for client applications in your ecosystem.</p>
                    
                    <div style="background: rgba(50, 50, 70, 0.5); padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3>Generate New API Key</h3>
                        <div class="form-group">
                            <label for="product-name">Product/App Name</label>
                            <input type="text" id="product-name" placeholder="e.g., My Coding Tool, Customer Support Bot">
                        </div>
                        <div class="form-group">
                            <label for="model-select">Default Model</label>
                            <select id="model-select">
                                <option value="qwen3-omni-30b-a3b-instruct">Qwen3-Omni-30B-A3B (Advanced)</option>
                                <option value="qwen2.5-omni">Qwen2.5-Omni (Multimodal)</option>
                                <option value="qwen2.5-coder">Qwen2.5-Coder (Code)</option>
                                <option value="llama3">Llama3 (General)</option>
                            </select>
                        </div>
                        <button class="btn primary-btn" onclick="generateApiKey()">Generate Key</button>
                    </div>
                    
                    <h3>Existing API Keys</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>API Key</th>
                                <th>Product</th>
                                <th>Model</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="api-keys-body">
                            <!-- Keys will be loaded here -->
                        </tbody>
                    </table>
                </div>

                <!-- Model Configuration Section -->
                <div id="models" class="section">
                    <h2>Model Configuration</h2>
                    <p>Configure model endpoints and parameters for different use cases.</p>
                    
                    <div class="model-config">
                        <h3>Connect to Hugging Face Models</h3>
                        <p>Configure the endpoints where bapXconnect connects to Hugging Face models:</p>
                        <ul>
                            <li><strong>Qwen3-Omni-30B-A3B:</strong> https://huggingface.co/Qwen/Qwen3-Omni-30B-A3B-Instruct</li>
                            <li><strong>Qwen2.5-Omni:</strong> https://huggingface.co/Qwen/Qwen2.5-Omni-7B</li>
                            <li><strong>Qwen2.5-Coder:</strong> https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct</li>
                            <li><strong>Llama3:</strong> https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct</li>
                        </ul>
                        
                        <div style="margin-top: 20px;">
                            <h4>Model Parameters</h4>
                            <div class="form-group">
                                <label>Temperature (0.0-1.0)</label>
                                <input type="range" min="0" max="1" step="0.1" value="0.7">
                            </div>
                            <div class="form-group">
                                <label>Max Tokens</label>
                                <input type="number" value="1024">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Client Apps Section -->
                <div id="clients" class="section">
                    <h2>Client Applications</h2>
                    <p>Manage your ecosystem of client applications using bapXconnect API.</p>
                    
                    <div>
                        <h3>Runtime Configuration</h3>
                        <p>Each client app has its own runtime environment:</p>
                        <ul>
                            <li>Individual API key per application</li>
                            <li>Separate session memory (Client Application Storage)</li>
                            <li>Model selection per app basis</li>
                            <li>Usage tracking and analytics</li>
                        </ul>
                    </div>
                    
                    <div style="margin-top: 30px;">
                        <h3>API Endpoint Info</h3>
                        <p><strong>Base URL:</strong> https://getwinharris.github.io/bapXconnect/api</p>
                        <p><strong>Authentication:</strong> X-DashScope-Token header</p>
                        <p><strong>Endpoints:</strong></p>
                        <ul>
                            <li><code>/api/v1/text/generation</code> - Main text generation</li>
                            <li><code>/api/v1/models</code> - List available models</li>
                            <li><code>/api/v1/text/tokenize</code> - Token counting</li>
                        </ul>
                    </div>
                </div>

                <!-- Integration Guide Section -->
                <div id="integration" class="section">
                    <h2>Integration Guide</h2>
                    <div class="documentation">
                        <h3>How to Integrate with bapXconnect API</h3>
                        <p>Use the generated API keys to connect your client applications to bapXconnect:</p>
                        
                        <h4>JavaScript/Node.js Example</h4>
                        <pre><code>// bapXconnect API Integration
const API_KEY = 'YOUR_GENERATED_API_KEY';

async function chatCompletion(messages) {
  const response = await fetch('https://getwinharris.github.io/bapXconnect/api/api/v1/text/generation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-DashScope-Token': API_KEY
    },
    body: JSON.stringify({
      model: 'qwen2.5-omni',
      input: { messages },
      parameters: { temperature: 0.7 }
    })
  });
  
  return response.json();
}

// Usage
const messages = [{ role: 'user', content: 'Hello!' }];
const result = await chatCompletion(messages);
console.log(result.output.text);</code></pre>
                        
                        <h4>Python Example</h4>
                        <pre><code># bapXconnect API Integration
import requests

API_KEY = "YOUR_GENERATED_API_KEY"

def chat_completion(messages):
    headers = {
        'Content-Type': 'application/json',
        'X-DashScope-Token': API_KEY
    }
    
    data = {
        'model': 'qwen2.5-omni',
        'input': {'messages': messages},
        'parameters': {'temperature': 0.7}
    }
    
    response = requests.post(
        'https://getwinharris.github.io/bapXconnect/api/api/v1/text/generation',
        headers=headers,
        json=data
    )
    
    return response.json()

# Usage
messages = [{'role': 'user', 'content': 'Hello!'}]
result = chat_completion(messages)
print(result['output']['text'])</code></pre>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function showSection(sectionId) {
            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            document.getElementById(sectionId).classList.add('active');
            
            // Update active nav item
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            event.target.classList.add('active');
            
            if (sectionId === 'apikeys') {
                loadApiKeys();
            }
        }
        
        function loadApiKeys() {
            fetch('/admin/apikeys', {
                headers: {
                    'Authorization': 'Basic ' + btoa('getwinharris:bapX2025#')
                }
            })
            .then(r => r.json())
            .then(data => {
                const tbody = document.getElementById('api-keys-body');
                tbody.innerHTML = '';
                
                data.keys.forEach(key => {
                    const row = document.createElement('tr');
                    row.innerHTML = \`
                        <td class="key-cell">\${key.key.substring(0, 20)}...</td>
                        <td>\${key.product}</td>
                        <td>\${key.model}</td>
                        <td>\${new Date(key.createdAt).toLocaleDateString()}</td>
                        <td>
                            <button class="btn secondary-btn" onclick="copyKey('\${key.key}')">Copy</button>
                            <button class="btn secondary-btn" onclick="deleteKey('\${key.key}')">Delete</button>
                        </td>
                    \`;
                    tbody.appendChild(row);
                });
                
                // Update dashboard stats
                document.getElementById('total-keys').textContent = data.keys.length;
                document.getElementById('total-models').textContent = \`${Object.keys(${JSON.stringify(MODEL_ENDPOINTS)}).length}\`;
            });
        }
        
        function generateApiKey() {
            const product = document.getElementById('product-name').value;
            const model = document.getElementById('model-select').value;
            
            fetch('/admin/apikeys', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('getwinharris:bapX2025#')
                },
                body: JSON.stringify({ product, model })
            })
            .then(r => r.json())
            .then(data => {
                if (data.key) {
                    alert('API key generated: ' + data.key);
                    loadApiKeys();
                    document.getElementById('product-name').value = '';
                }
            });
        }
        
        function copyKey(key) {
            navigator.clipboard.writeText(key);
            alert('API key copied to clipboard!');
        }
        
        function deleteKey(key) {
            if (confirm('Delete this API key?')) {
                fetch('/admin/apikeys/' + encodeURIComponent(key), {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Basic ' + btoa('getwinharris:bapX2025#')
                    }
                })
                .then(r => r.json())
                .then(loadApiKeys);
            }
        }
        
        // Initialize dashboard
        document.getElementById('total-models').textContent = Object.keys(MODEL_ENDPOINTS).length;
        document.getElementById('total-keys').textContent = apiKeys.length;
        loadApiKeys();
    </script>
</body>
</html>
  `);
});

// Main playground UI with profile dropdown and sidebar
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>bapXconnect - AI Chat Interface</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background: linear-gradient(135deg, #0f172a 0%, #1a1a2e 100%);
            color: #e6e6e5;
            height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .header {
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(10px);
            padding: 15px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #4361ee;
            z-index: 100;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.3rem;
            color: #4cc9f0;
        }

        .controls {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .model-selector {
            position: relative;
        }

        select {
            background: rgba(25, 50, 60, 0.8);
            color: #e6e6e5;
            border: 1px solid #4361ee;
            padding: 8px 30px 8px 12px;
            border-radius: 8px;
            appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a9d6e5' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 10px center;
            background-size: 16px;
            font-size: 0.9rem;
        }

        .profile-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(45deg, #4361ee, #f72585);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
        }

        .profile-icon:hover {
            background: linear-gradient(45deg, #f72585, #4361ee);
        }

        .profile-dropdown {
            position: absolute;
            top: 50px;
            right: 0;
            background: rgba(15, 23, 42, 0.95);
            border: 1px solid #4361ee;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            min-width: 200px;
            z-index: 1000;
            display: none;
        }

        .dropdown-item {
            padding: 12px 15px;
            color: #a9d6e5;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .dropdown-item:hover {
            background: rgba(76, 201, 240, 0.2);
            color: #4cc9f0;
        }

        .main-container {
            display: flex;
            flex: 1;
            overflow: hidden;
        }

        .sidebar {
            width: 280px;
            background: rgba(25, 30, 46, 0.9);
            border-right: 1px solid #4361ee;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
        }

        .sidebar.minimized {
            width: 60px;
        }

        .sidebar-header {
            padding: 15px;
            border-bottom: 1px solid #4361ee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .toggle-sidebar {
            cursor: pointer;
            color: #4cc9f0;
        }

        .session-list {
            padding: 15px;
        }

        .session-item {
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 8px;
            background: rgba(50, 50, 70, 0.5);
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .session-item:hover {
            background: rgba(76, 201, 240, 0.2);
        }

        .rag-memory {
            padding: 15px;
            background: rgba(76, 201, 240, 0.1);
            border-top: 1px solid #4361ee;
            margin-top: auto;
        }

        .rag-memory h3 {
            color: #4cc9f0;
            font-size: 1rem;
            margin-bottom: 10px;
        }

        .rag-entry {
            padding: 8px;
            background: rgba(30, 40, 60, 0.6);
            border-radius: 4px;
            margin-bottom: 5px;
            font-size: 0.85rem;
        }

        .chat-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: rgba(15, 23, 42, 0.6);
        }

        .chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .message {
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 10px;
            line-height: 1.5;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .user-message {
            background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
            align-self: flex-end;
            color: white;
        }

        .assistant-message {
            background: rgba(76, 201, 240, 0.15);
            align-self: flex-start;
            color: #e6e6e5;
        }

        .message-header {
            font-weight: 600;
            margin-bottom: 5px;
            font-size: 0.9rem;
        }

        .user-message .message-header {
            color: rgba(255, 255, 255, 0.9);
        }

        .assistant-message .message-header {
            color: #4cc9f0;
        }

        .input-container {
            padding: 20px;
            background: rgba(15, 23, 42, 0.95);
            border-top: 1px solid #4361ee;
        }

        .input-row {
            display: flex;
            gap: 10px;
        }

        textarea {
            flex: 1;
            padding: 15px;
            border-radius: 12px;
            border: 1px solid #4361ee;
            background: rgba(25, 50, 60, 0.8);
            color: white;
            resize: none;
            font-size: 1rem;
            min-height: 60px;
            max-height: 150px;
        }

        textarea:focus {
            outline: none;
            border-color: #4cc9f0;
            box-shadow: 0 0 0 2px rgba(76, 201, 240, 0.3);
        }

        .action-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-left: 10px;
        }

        .btn {
            padding: 12px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.2s ease;
        }

        .primary-btn {
            background: linear-gradient(90deg, #4361ee, #3a0ca3);
            color: white;
        }

        .primary-btn:hover {
            background: linear-gradient(90deg, #3a0ca3, #7209b7);
            transform: translateY(-2px);
        }

        .secondary-btn {
            background: rgba(76, 201, 240, 0.2);
            color: #4cc9f0;
            border: 1px solid #4361ee;
        }

        .secondary-btn:hover {
            background: rgba(76, 201, 240, 0.4);
        }

        .typing-indicator {
            display: none;
            padding: 15px 20px;
            color: #4cc9f0;
            font-style: italic;
        }

        .minimized .hidden-on-minimize {
            display: none;
        }

        @media (max-width: 768px) {
            .main-container {
                flex-direction: column;
            }

            .sidebar {
                width: 100%;
                height: auto;
                max-height: 200px;
            }

            .chat-container {
                height: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">
            <i class="fas fa-robot"></i>
            <span>bapXconnect</span>
        </div>
        <div class="controls">
            <div class="model-selector">
                <select id="model-select">
                    <option value="qwen3-omni-30b-a3b-instruct">Qwen3-Omni-30B-A3B (Advanced)</option>
                    <option value="qwen2.5-omni" selected>Qwen2.5-Omni (Multimodal)</option>
                    <option value="qwen2.5-coder">Qwen2.5-Coder (Code)</option>
                    <option value="llama3">Llama3 (General)</option>
                </select>
            </div>
            <div class="profile-icon" onclick="toggleProfileDropdown()">
                <i class="fas fa-user-circle"></i>
                <div class="profile-dropdown" id="profileDropdown">
                    <div class="dropdown-item" onclick="openSettings()">
                        <i class="fas fa-cog"></i>
                        <span>Settings</span>
                    </div>
                    <div class="dropdown-item" onclick="openAdminPanel()">
                        <i class="fas fa-shield-alt"></i>
                        <span>Admin Panel</span>
                    </div>
                    <div class="dropdown-item">
                        <i class="fas fa-question-circle"></i>
                        <span>Help</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="main-container">
        <div class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <h3>Chat History</h3>
                <div class="toggle-sidebar" onclick="toggleSidebar()">
                    <i class="fas fa-chevron-left"></i>
                </div>
            </div>
            <div class="session-list">
                <div class="session-item" onclick="loadSession('session1')">
                    <div style="font-weight: bold;">Project Discussion</div>
                    <div style="font-size: 0.8rem; color: #a9d6e5;">Just now</div>
                </div>
                <div class="session-item" onclick="loadSession('session2')">
                    <div style="font-weight: bold;">Code Review</div>
                    <div style="font-size: 0.8rem; color: #a9d6e5;">Yesterday</div>
                </div>
                <div class="session-item" onclick="loadSession('session3')">
                    <div style="font-weight: bold;">Model Testing</div>
                    <div style="font-size: 0.8rem; color: #a9d6e5;">Dec 15, 2024</div>
                </div>
            </div>
            
            <div class="rag-memory">
                <h3>RAG Memory</h3>
                <div class="rag-entry">Project context: Node.js Express app</div>
                <div class="rag-entry">Recent query: How to implement auth</div>
                <div class="rag-entry">Code pattern: JWT with middleware</div>
            </div>
        </div>

        <div class="chat-container">
            <div class="chat-messages" id="chat-messages">
                <div class="message assistant-message">
                    <div class="message-header">Assistant</div>
                    <div class="message-content">Hello! I'm your AI assistant powered by bapXconnect. I'm currently using the Qwen2.5-Omni model. How can I help you today?</div>
                </div>
            </div>
            
            <div class="typing-indicator" id="typingIndicator">
                <i class="fas fa-circle-notch fa-spin"></i> Assistant is typing...
            </div>
            
            <div class="input-container">
                <div class="input-row">
                    <textarea id="userInput" placeholder="Message bapXconnect..."></textarea>
                    <div class="action-buttons">
                        <button class="btn primary-btn" onclick="sendMessage()">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                        <button class="btn secondary-btn" onclick="clearChat()">
                            <i class="fas fa-eraser"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        let currentSession = [];
        let currentModel = 'qwen2.5-omni';

        function toggleProfileDropdown() {
            const dropdown = document.getElementById('profileDropdown');
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }

        function openSettings() {
            // Navigate to settings page or show settings modal
            window.location.href = '/admin';
        }

        function openAdminPanel() {
            window.location.href = '/admin';
        }

        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('minimized');
            const toggleIcon = document.querySelector('.toggle-sidebar i');
            if (sidebar.classList.contains('minimized')) {
                toggleIcon.className = 'fas fa-chevron-right';
            } else {
                toggleIcon.className = 'fas fa-chevron-left';
            }
        }

        function loadSession(sessionId) {
            // In a real implementation, this would load a stored session
            addMessage('assistant', 'Session "' + sessionId + '" loaded. Continuing conversation...');
        }

        function addMessage(role, content) {
            const chatDiv = document.getElementById('chat-messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = \`message \${role}-message\`;
            messageDiv.innerHTML = \`
                <div class="message-header">\${role === 'user' ? 'You' : 'Assistant'}</div>
                <div class="message-content">\${content}</div>
            `;
            chatDiv.appendChild(messageDiv);
            chatDiv.scrollTop = chatDiv.scrollHeight;
        }

        async function sendMessage() {
            const input = document.getElementById('userInput').value.trim();
            const model = document.getElementById('model-select').value;
            
            if (!input) {
                alert('Please enter a message');
                return;
            }

            // Add user message
            addMessage('user', input);
            currentSession.push({ role: 'user', content: input });
            document.getElementById('userInput').value = '';

            // Show typing indicator
            document.getElementById('typingIndicator').style.display = 'block';
            const chatDiv = document.getElementById('chat-messages');
            chatDiv.scrollTop = chatDiv.scrollHeight;

            try {
                // Prepare the API request in Alibaba/DashScope format
                const requestBody = {
                    model: model,
                    input: {
                        messages: currentSession
                    },
                    parameters: {
                        temperature: 0.7,
                        max_tokens: 1024
                    }
                };

                // Send to bapXconnect API
                const response = await fetch('/api/v1/text/generation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-DashScope-Token': 'getwinharris.github.io/bapXconnect/api'  // Fixed API key
                    },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    throw new Error(\`API request failed: \${response.status} \${response.statusText}\`);
                }

                const data = await response.json();
                const content = data.output?.text || data.choices?.[0]?.message?.content || 'No response';
                
                // Add assistant response
                addMessage('assistant', content);
                currentSession.push({ role: 'assistant', content: content });
                
            } catch (error) {
                addMessage('assistant', 'Error: ' + error.message);
            } finally {
                document.getElementById('typingIndicator').style.display = 'none';
            }
        }

        function clearChat() {
            document.getElementById('chat-messages').innerHTML = '';
            currentSession = [];
            addMessage('assistant', 'Chat cleared. Start a new conversation with bapXconnect.');
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.profile-icon')) {
                document.getElementById('profileDropdown').style.display = 'none';
            }
        });

        // Allow Enter to send (with Shift+Enter for new line)
        document.getElementById('userInput').addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // Focus input on load
        document.getElementById('userInput').focus();
    </script>
</body>
</html>
  `);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 bapXconnect Server running on port ${PORT}`);
  console.log(`🔗 Main Interface: http://localhost:${PORT}/`);
  console.log(`⚙️  Admin Panel: http://localhost:${PORT}/admin`);
  console.log(`🔐 API Endpoint: http://localhost:${PORT}/api/v1/text/generation`);
  console.log(`🔑 Admin Credentials: getwinharris / bapX2025#`);
  console.log(`🔄 Available Models:`, Object.keys(MODEL_ENDPOINTS));
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('\n📝 GitHub Cloud Setup Instructions:');
    console.log('   1. Repository: https://github.com/getwinharris/bapXconnect');
    console.log('   2. GitHub Pages: Enable in Settings > Pages > Source: Deploy from main branch');
    console.log('   3. Access at: https://getwinharris.github.io/bapXconnect/');
    console.log('   4. API Keys: Generate via admin panel using getwinharris@gmail.com / bapX2025#');
  }
});

export default app;