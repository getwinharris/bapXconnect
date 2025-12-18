#!/usr/bin/env node

/**
 * @license
 * Copyright 2025 bapX
 * SPDX-License-Identifier: Apache-2.0
 */

import { BapXApiServer } from './api/localApiServer.js';
import { Config } from './config/config.js';
import { loadSettings } from './config/settings.js';

async function startBapXApi() {
  console.log('🚀 Starting bapX API Server...');
  console.log('🤖 Connecting to bapX API infrastructure and Hugging Face models');
  console.log('🔗 API endpoint: http://localhost:8080');

  try {
    // Configuration for the bapX API connection
    const modelConfig = {
      model: 'qwen3-omni-30b-a3b-instruct',
      modelPath: process.env.MODEL_PATH || 'https://huggingface.co/Qwen/Qwen3-Omni-30B-A3B-Instruct/tree/main', // Remote model path for bapX API
      samplingParams: {
        temperature: 0.7,
        top_p: 0.8,
        max_tokens: 1024,
      }
    };

    const cliConfig = {
      getAuthType: () => 'bapx-api',
      getProjectRoot: () => process.cwd(),
      // Other configuration values...
    };

    // Create and start the bapX API server
    const apiServer = new BapXApiServer(modelConfig, cliConfig, 8080);
    await apiServer.start();

    console.log('✅ bapX API Server is running!');
    console.log('📋 Access via: http://localhost:8080');
    console.log('💡 API endpoint: http://localhost:8080/api');
    console.log('🔮 Models: qwen2.5-omni, qwen2.5-coder, qwen3-omni-30b-a3b-instruct');
    console.log('🌍 Connected to bapX infrastructure');

    // Keep the server running
    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down bapX API server...');
      await apiServer.stop();
      console.log('👋 bapX API server stopped. Goodbye!');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Error starting bapX API server:', error);
    process.exit(1);
  }
}

// Start the bapX API server
startBapXApi();