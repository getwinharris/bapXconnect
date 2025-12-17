/**
 * @license
 * Copyright 2025 bapX
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Config } from '../config/config.js';
import { SessionManager } from '../session/sessionManager.js';
import { createLocalApiContentGenerator } from '../model/localApiModelConnector.js';
import { LocalApiServer } from '../api/localApiServer.js';
import { AuthType } from '../config/auth.js';

export interface InitializationResult {
  contentGenerator: ContentGenerator;
  sessionManager: SessionManager;
  hasPreviousSession: boolean;
  previousContext: string;
  authError: string | null;
  themeError: string | null;
  shouldOpenAuthDialog: boolean;
  geminiMdFileCount: number;
  apiServer: LocalApiServer; // Include the API server instance
}

/**
 * Initialize the application with local API server on Harris's machine
 * Starts the local API that connects to the Qwen2.5-Omni model
 * Sets up project-specific session management for continuity
 */
export async function initializeAppWithSession(
  config: Config,
  settings: any,
): Promise<InitializationResult> {
  console.log('🤖 Initializing bapX with local API connection for Harris...');
  
  // Start the local API server that connects to Harris's local Qwen2.5-Omni model
  console.log('🚀 Starting local API server...');
  const modelConfig = {
    model: 'qwen2.5-omni-local',
    modelPath: process.env.MODEL_PATH || './models/qwen2.5-omni/', 
    samplingParams: {
      temperature: 0.7,
      max_tokens: 1024,
    }
  };
  
  // Create API server instance
  const apiServer = new LocalApiServer(modelConfig, config, 8080);
  await apiServer.start();
  
  // Create session manager for the current project
  const sessionManager = new SessionManager(process.cwd());
  
  // Load or create the session tree
  const sessionTree = sessionManager.loadSessionTree();
  
  // Check if there's a previous session for this project
  const hasPreviousSession = sessionTree.nodes.length > 0;
  
  // Get recent context from the session tree for continuity
  let previousContext = '';
  if (hasPreviousSession && sessionTree.nodes.length > 0) {
    // Get the last few interactions for context
    const recentNodes = sessionTree.nodes.slice(-5); // Last 5 interactions
    previousContext = recentNodes.map(node => 
      `[${node.role.toUpperCase()}] ${node.content}`
    ).join('\n\n');
  }
  
  // Create content generator that connects to local API
  const contentGeneratorConfig = {
    model: 'qwen2.5-omni-local',
    baseUrl: 'http://localhost:8080', // Local API endpoint
    apiKey: 'local-test-key', // Local testing key
    samplingParams: {
      temperature: 0.7,
      max_tokens: 1024,
    }
  };
  
  const contentGenerator = await createLocalApiContentGenerator(contentGeneratorConfig, config);
  
  // For local testing, skip external auth since we're using local model
  const authType = settings?.merged?.security?.auth?.selectedType || AuthType.LOCAL_MODEL;
  let authError: string | null = null;
  let themeError: string | null = null;
  let shouldOpenAuthDialog = false;
  
  if (authType === AuthType.LOCAL_MODEL) {
    console.log('🔒 Using local model authentication - no external API keys needed');
    console.log('📋 Connected to Qwen2.5-Omni model on Harris\'s local machine');
  } else {
    shouldOpenAuthDialog = settings?.merged?.security?.auth?.selectedType === undefined;
  }
  
  // Return the initialization result with all required components
  return {
    contentGenerator,
    sessionManager,
    hasPreviousSession,
    previousContext,
    authError,
    themeError,
    shouldOpenAuthDialog,
    geminiMdFileCount: 0, // Placeholder - would get actual count from config
    apiServer, // Return the API server instance
  };
}