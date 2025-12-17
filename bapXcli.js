#!/usr/bin/env node

/**
 * @license
 * Copyright 2025 bapX
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeAppWithSession } from './initializer.js';
import { Config } from './config/config.js';
import { loadSettings } from './config/settings.js';
import { LocalApiServer } from './api/localApiServer.js';

async function main() {
  console.log('🤖 Starting bapX CLI - Connected to local Qwen2.5-Omni model');
  console.log('🏠 Running on Harris\'s machine');
  
  // Load settings
  const settings = loadSettings();
  
  // Set up basic config
  const config = {
    getAuthType: () => 'local-model',
    getProjectRoot: () => process.cwd(),
    getGeminiMdFileCount: () => 0,
    // Add other config methods as needed...
  };
  
  try {
    // Initialize the app with session management and local API connection
    const initializationResult = await initializeAppWithSession(config, settings);
    
    console.log('\n✅ bapX CLI initialized successfully!');
    console.log(`📋 Connected to: ${initializationResult.contentGenerator.constructor.name}`);
    console.log(`🔗 Local API: http://localhost:8080`);
    console.log(`🔮 Model: qwen2.5-omni-local`);
    console.log(`💾 Project sessions in: ~/.clibapX/${process.cwd().split('/').pop()}/`);
    
    if (initializationResult.hasPreviousSession) {
      console.log('🔄 Previous session context loaded');
    } else {
      console.log('🆕 New session started');
    }
    
    // At this point, the CLI is connected to the local API
    // and ready to process user requests using the local Qwen2.5-Omni model
    console.log('\n🚀 bapX CLI is ready to use with local model!');
    console.log('💡 The CLI will connect to the local API server to reach the model.');
    
  } catch (error) {
    console.error('❌ Error initializing bapX CLI:', error);
    process.exit(1);
  }
}

// Start the application
main();