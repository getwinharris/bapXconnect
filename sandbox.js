/**
 * bapXconnect API Gateway - GitHub Cloud Server
 * 
 * Self-contained API gateway that provides:
 * - API endpoints for client apps to connect to Hugging Face models
 * - Admin panel for API key generation 
 * - Playground UI for testing models
 * - Session management for temporary chats
 * 
 * Designed to run in GitHub Codespaces or similar cloud environments
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
app.use(express.static(path.join(__dirname, '.')));

// Simple in-memory storage (would use Redis/DB in production)
let apiKeys = [];
let sessions = {};

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

// Hugging Face model mappings (these are the actual model identifiers)
const MODEL_ENDPOINTS = {
  'qwen3-omni-30b-a3b-instruct': 'Qwen/Qwen3-Omni-30B-A3B-Instruct',
  'qwen2.5-omni': 'Qwen/Qwen2.5-Omni-7B',
  'qwen2.5-coder': 'Qwen/Qwen2.5-Coder-7B-Instruct',
  'llama3': 'meta-llama/Meta-Llama-3-8B-Instruct',
  // Add more models as needed
};

// Main text generation endpoint
app.post('/api/v1/text/generation', async (req, res) => {
  const authHeader = req.headers['x-dashscope-token'] || req.headers['authorization'];
  const apiKey = authHeader?.replace('Bearer ', '') || authHeader;
  
  if (!apiKey || !isValidApiKey(apiKey)) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  const { model, input, parameters = {} } = req.body;
  
  // Validate model
  if (!MODEL_ENDPOINTS[model]) {
    return res.status(400).json({ error: `Model ${model} not supported` });
  }

  // Extract messages from input
  const messages = input.messages || [];
  const lastMessage = messages[messages.length - 1]?.content || 'Hello';

  // In a real implementation, this would connect to Hugging Face
  // For demo purposes, we'll simulate the response
  const hfModel = MODEL_ENDPOINTS[model];
  const simulatedResponse = `This is a simulated response from model: ${model} (${hfModel})
  
Input received: "${lastMessage}"

In a live implementation, bapXconnect would:
1. Forward this request to Hugging Face model: ${hfModel}
2. Process the response from the actual model
3. Return the response formatted for bapXconnect API compatibility

This confirms your API connection is working properly.`;

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
  const tokenCount = Math.ceil(text.length / 4); // Rough approximation
  
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
app.use('/admin', adminAuth);

// Get all API keys
app.get('/admin/apikeys', (req, res) => {
  res.json({ keys: apiKeys });
});

// Generate new API key
app.post('/admin/apikeys', (req, res) => {
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

// Delete API key
app.delete('/admin/apikeys/:key', (req, res) => {
  const keyToDelete = req.params.key;
  apiKeys = apiKeys.filter(k => k.key !== keyToDelete);
  res.json({ success: true });
});

// Serve admin panel
app.get('/admin*', (req, res) => {
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
            padding: 20px;
        }
        .container { 
            max-width: 1000px; 
            margin: 0 auto; 
            background: rgba(15, 23, 42, 0.8); 
            padding: 30px; 
            border-radius: 15px; 
            border: 1px solid #4361ee;
        }
        h1 { 
            color: #4cc9f0; 
            text-align: center; 
            margin-bottom: 30px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            color: #a9d6e5;
        }
        input, select, button { 
            width: 100%; 
            padding: 12px; 
            border-radius: 8px; 
            border: 1px solid #4361ee; 
            background: rgba(25, 50, 60, 0.8); 
            color: white; 
            font-size: 1rem;
        }
        button { 
            background: linear-gradient(90deg, #4361ee, #3a0ca3); 
            color: white; 
            border: none; 
            cursor: pointer; 
            font-weight: 600;
            margin-top: 10px;
        }
        button:hover { 
            background: linear-gradient(90deg, #3a0ca3, #7209b7); 
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 30px;
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
        .action-btn {
            padding: 6px 12px;
            width: auto;
            display: inline-block;
            margin: 2px 5px;
        }
        .info-section {
            background: rgba(76, 201, 240, 0.1);
            padding: 20px;
            border-radius: 10px;
            margin-top: 30px;
        }
        .info-section h3 {
            color: #4cc9f0;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>bapXconnect Admin Panel</h1>
        
        <div class="form-group">
            <label for="productName">Product/App Name</label>
            <input type="text" id="productName" placeholder="e.g., My Coding Tool" />
        </div>
        
        <div class="form-group">
            <label for="modelSelect">Model to Associate</label>
            <select id="modelSelect">
                <option value="qwen3-omni-30b-a3b-instruct">Qwen3-Omni-30B-A3B-Instruct</option>
                <option value="qwen2.5-omni">Qwen2.5-Omni</option>
                <option value="qwen2.5-coder">Qwen2.5-Coder</option>
                <option value="llama3">Llama3</option>
            </select>
        </div>
        
        <button onclick="generateApiKey()">Generate New API Key</button>
        
        <div class="info-section">
            <h3>API Information</h3>
            <p><strong>API Endpoint:</strong> ${req.protocol}://${req.get('host')}/api/v1/text/generation</p>
            <p><strong>Authentication:</strong> Use X-DashScope-Token header with generated keys</p>
            <p><strong>Models Available:</strong> ${Object.keys(MODEL_ENDPOINTS).join(', ')}</p>
            <p><strong>Connection:</strong> bapXconnect connects to Hugging Face models at: ${Object.values(MODEL_ENDPOINTS).join(', ')}</p>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th>API Key</th>
                    <th>Product</th>
                    <th>Model</th>
                    <th>Created</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="keysTableBody"></tbody>
        </table>
    </div>

    <script>
        function generateApiKey() {
            const product = document.getElementById('productName').value || 'unnamed-app';
            const model = document.getElementById('modelSelect').value;
            
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
                    alert('API Key generated: ' + data.key);
                    loadKeys();
                }
            });
        }
        
        function deleteKey(key) {
            if (confirm('Delete this key?')) {
                fetch('/admin/apikeys/' + encodeURIComponent(key), {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Basic ' + btoa('getwinharris:bapX2025#')
                    }
                })
                .then(r => r.json())
                .then(loadKeys);
            }
        }
        
        function copyKey(key) {
            navigator.clipboard.writeText(key);
            alert('Copied to clipboard: ' + key);
        }
        
        function loadKeys() {
            fetch('/admin/apikeys', {
                headers: {
                    'Authorization': 'Basic ' + btoa('getwinharris:bapX2025#')
                }
            })
            .then(r => r.json())
            .then(data => {
                const tbody = document.getElementById('keysTableBody');
                tbody.innerHTML = '';
                
                data.keys.forEach(k => {
                    const row = document.createElement('tr');
                    row.innerHTML = \`
                        <td class="key-cell">\${k.key.substring(0, 20)}...\</td>
                        <td>\${k.product}</td>
                        <td>\${k.model}</td>
                        <td>\${new Date(k.createdAt).toLocaleString()}</td>
                        <td>\${k.status}</td>
                        <td>
                            <button class="action-btn" onclick="copyKey('\${k.key}')">Copy</button>
                            <button class="action-btn" onclick="deleteKey('\${k.key}')">Delete</button>
                        </td>
                    \`;
                    tbody.appendChild(row);
                });
            });
        }
        
        loadKeys();
    </script>
</body>
</html>
  `);
});

// Serve the main playground UI
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>bapXconnect Playground</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
            display: flex;
            flex-direction: column;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 20px;
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            border-bottom: 1px solid #4361ee;
            margin-bottom: 20px;
        }
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.5rem;
            color: #4cc9f0;
        }
        .controls {
            display: flex;
            gap: 15px;
            align-items: center;
        }
        select, input { 
            padding: 10px; 
            border-radius: 8px; 
            border: 1px solid #4361ee; 
            background: rgba(25, 50, 60, 0.8); 
            color: white; 
            font-size: 1rem;
        }
        .chat-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: rgba(15, 23, 42, 0.6);
            border-radius: 15px;
            border: 1px solid #4361ee;
            overflow: hidden;
            min-height: 500px;
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
            padding: 15px;
            border-radius: 12px;
            max-width: 80%;
            line-height: 1.5;
            animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .user-message {
            background: linear-gradient(90deg, #4361ee, #3a0ca3);
            align-self: flex-end;
        }
        .assistant-message {
            background: rgba(76, 201, 240, 0.15);
            align-self: flex-start;
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
        .input-area {
            padding: 20px;
            border-top: 1px solid #4361ee;
            background: rgba(15, 23, 42, 0.8);
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
            resize: vertical;
            font-size: 1rem;
            min-height: 80px;
        }
        .action-buttons {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
        .btn {
            padding: 12px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .primary-btn {
            background: linear-gradient(90deg, #4361ee, #3a0ca3);
            color: white;
        }
        .primary-btn:hover {
            background: linear-gradient(90deg, #3a0ca3, #7209b7);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
        }
        .secondary-btn {
            background: rgba(100, 100, 140, 0.5);
            color: #a9d6e5;
            border: 1px solid #4361ee;
        }
        .secondary-btn:hover {
            background: rgba(100, 100, 140, 0.8);
        }
        .info-panel {
            background: rgba(76, 201, 240, 0.1);
            padding: 20px;
            border-radius: 10px;
            margin-top: 30px;
            border-left: 4px solid #4cc9f0;
        }
        .info-panel h3 {
            color: #4cc9f0;
            margin-bottom: 10px;
        }
        .info-panel p {
            margin: 5px 0;
            color: #c2cbd2;
        }
        .typing-indicator {
            padding: 10px 15px;
            background: rgba(76, 201, 240, 0.1);
            border-radius: 12px;
            align-self: flex-start;
            display: none;
        }
        .model-selector label {
            color: #a9d6e5;
            margin-right: 10px;
        }
        
        @media (max-width: 768px) {
            .header {
                flex-direction: column;
                gap: 15px;
                align-items: flex-start;
            }
            .controls {
                width: 100%;
                justify-content: space-between;
            }
            .message {
                max-width: 90%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <i class="fas fa-robot"></i>
                <span>bapXconnect Playground</span>
            </div>
            <div class="controls">
                <div class="model-selector">
                    <label for="modelSelect">Model:</label>
                    <select id="modelSelect">
                        <option value="qwen3-omni-30b-a3b-instruct">Qwen3-Omni-30B-A3B</option>
                        <option value="qwen2.5-omni" selected>Qwen2.5-Omni</option>
                        <option value="qwen2.5-coder">Qwen2.5-Coder</option>
                        <option value="llama3">Llama3</option>
                    </select>
                </div>
                <input type="text" id="apiKeyInput" placeholder="API Key" style="width: 200px;" />
                <a href="/admin" target="_blank" class="btn secondary-btn">Admin Panel</a>
            </div>
        </div>
        
        <div class="chat-container">
            <div class="chat-messages" id="chatMessages">
                <div class="message assistant-message">
                    <div class="message-header">System</div>
                    <div>Welcome to bapXconnect Playground! Select a model, enter your API key, and start chatting. This connects to Hugging Face models through the bapXconnect API gateway.</div>
                </div>
            </div>
            
            <div class="typing-indicator" id="typingIndicator">
                <i class="fas fa-circle-notch fa-spin"></i> AI is thinking...
            </div>
            
            <div class="input-area">
                <div class="input-row">
                    <textarea id="userInput" placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"></textarea>
                </div>
                <div class="action-buttons">
                    <button class="btn primary-btn" onclick="sendMessage()">
                        <i class="fas fa-paper-plane"></i> Send Message
                    </button>
                    <button class="btn secondary-btn" onclick="clearChat()">
                        <i class="fas fa-eraser"></i> Clear Chat
                    </button>
                </div>
            </div>
        </div>
        
        <div class="info-panel">
            <h3>API Connection Information</h3>
            <p><strong>Endpoint:</strong> ${req.protocol}://${req.get('host')}/api/v1/text/generation</p>
            <p><strong>Authentication:</strong> X-DashScope-Token header with your API key</p>
            <p><strong>Models Available:</strong> ${Object.keys(MODEL_ENDPOINTS).join(', ')}</p>
            <p><strong>Backend:</strong> Connects to Hugging Face models at ${Object.values(MODEL_ENDPOINTS).join(', ')}</p>
        </div>
    </div>

    <script>
        let messages = [];
        
        function addMessage(role, content) {
            const chatDiv = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = \`message \${role}-message\`;
            messageDiv.innerHTML = \`
                <div class="message-header">\${role === 'user' ? 'You' : 'Assistant'}</div>
                <div>\${content}</div>
            `;
            chatDiv.appendChild(messageDiv);
            chatDiv.scrollTop = chatDiv.scrollHeight;
        }
        
        async function sendMessage() {
            const input = document.getElementById('userInput').value.trim();
            const model = document.getElementById('modelSelect').value;
            const apiKey = document.getElementById('apiKeyInput').value;
            
            if (!input) {
                alert('Please enter a message');
                return;
            }
            
            if (!apiKey) {
                alert('Please enter your API key');
                return;
            }
            
            // Add user message
            addMessage('user', input);
            messages.push({ role: 'user', content: input });
            
            // Clear input
            document.getElementById('userInput').value = '';
            
            // Show typing indicator
            document.getElementById('typingIndicator').style.display = 'block';
            const chatDiv = document.getElementById('chatMessages');
            chatDiv.scrollTop = chatDiv.scrollHeight;
            
            try {
                // Call the API
                const response = await fetch('/api/v1/text/generation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-DashScope-Token': apiKey
                    },
                    body: JSON.stringify({
                        model: model,
                        input: { messages },
                        parameters: { 
                            temperature: 0.7,
                            max_tokens: 1024
                        }
                    })
                });
                
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error?.message || 'API request failed');
                }
                
                // Add assistant response
                const content = data.output?.text || 'No response';
                addMessage('assistant', content);
                messages.push({ role: 'assistant', content });
                
            } catch (error) {
                addMessage('assistant', 'Error: ' + error.message);
            } finally {
                // Hide typing indicator
                document.getElementById('typingIndicator').style.display = 'none';
            }
        }
        
        function clearChat() {
            messages = [];
            document.getElementById('chatMessages').innerHTML = '<div class="message assistant-message"><div class="message-header">System</div><div>Welcome to bapXconnect Playground! Select a model, enter your API key, and start chatting.</div></div>';
        }
        
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
  console.log(`🔗 API Gateway: http://localhost:${PORT}`);
  console.log(`🌐 Playground: http://localhost:${PORT}/`);
  console.log(`⚙️  Admin Panel: http://localhost:${PORT}/admin (user: getwinharris / pass: bapX2025#)`);
  console.log(`🔐 API Endpoint: http://localhost:${PORT}/api/v1/text/generation`);
  console.log(`🔑 API Key format: X-DashScope-Token header`);
  console.log(`🔄 Available Models:`, Object.keys(MODEL_ENDPOINTS));
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('\n📝 To run in GitHub Codespaces:');
    console.log('   1. Open this repository in Codespaces');
    console.log('   2. Run: npm install express cors');  
    console.log('   3. Run: node sandbox.js');
    console.log('   4. Access the server via the forwarded port');
  }
});

export default app;