#!/usr/bin/env node

/**
 * @license
 * Copyright 2025 bapX
 * SPDX-License-Identifier: Apache-2.0
 */

import { LocalApiServer } from './api/localApiServer.js';
import { Config } from './config/config.js';
import { loadSettings } from './config/settings.js';

async function startLocalApi() {
  console.log('🚀 Starting bapX Local API Server for Harris...');
  console.log('🤖 Connecting to local Qwen2.5-Omni model on Harris\'s machine');
  console.log('🔗 API endpoint: http://localhost:8080');
  
  try {
    // Configuration for the local model on Harris's machine
    const modelConfig = {
      model: 'qwen2.5-omni-local',
      modelPath: process.env.MODEL_PATH || './model/', // Local model path on Harris's machine
      samplingParams: {
        temperature: 0.7,
        max_tokens: 1024,
      }
    };
    
    const cliConfig = {
      getAuthType: () => 'local-model',
      getProjectRoot: () => process.cwd(),
      // Other configuration values...
    };
    
    // Create and start the local API server
    const apiServer = new LocalApiServer(modelConfig, cliConfig, 8080);
    await apiServer.start();
    
    console.log('✅ bapX Local API Server is running!');
    console.log('📋 Access via: http://localhost:8080');
    console.log('💡 API Key: http://localhost:8080/api');
    console.log('🔮 Model: qwen2.5-omni-local');
    console.log('🏠 Running on Harris\'s local machine');
    
    // Keep the server running
    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down local API server...');
      await apiServer.stop();
      console.log('👋 Local API server stopped. Goodbye!');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Error starting local API server:', error);
    process.exit(1);
  }
}

// Start the local API server
startLocalApi();