/**
 * @license
 * Copyright 2025 bapX
 * SPDX-License-Identifier: Apache-2.0
 */

import { SessionManager } from './session/sessionManager.js';
import { Config } from './config/config.js';
import { LoadedSettings } from './config/settings.js';
import { createLocalApiContentGenerator } from './model/localApiModelConnector.js';

export interface SessionInitializationResult {
  sessionManager: SessionManager;
  hasPreviousSession: boolean;
  previousContext: string;
  authError: string | null;
  themeError: string | null;
  shouldOpenAuthDialog: boolean;
  geminiMdFileCount: number;
  contentGenerator: any; // Content generator that connects to local API
}

/**
 * Initializes the application with project-specific session management
 * Loads previous session context and sets up the session manager for the current project
 * Connects to Harris's local API server running on his machine
 */
export async function initializeAppWithSession(
  config: Config,
  settings: LoadedSettings,
): Promise<SessionInitializationResult> {
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
  
  // Create content generator that connects to local API on Harris's machine
  const contentGeneratorConfig = {
    model: 'qwen2.5-omni-local',
    baseUrl: 'http://localhost:8080', // Local API endpoint on Harris's machine
    apiKey: 'local-test-key', // Local testing key
    samplingParams: {
      temperature: 0.7,
      max_tokens: 1024,
    }
  };
  
  const contentGenerator = await createLocalApiContentGenerator(contentGeneratorConfig, config);
  
  // For local model approach, we don't need external auth, so we can bypass
  // auth checks if the selected type is LOCAL_MODEL
  const authType = settings.merged.security?.auth?.selectedType;
  let authError: string | null = null;
  let themeError: string | null = null;
  let shouldOpenAuthDialog = false;
  
  if (authType !== 'local-model') {
    // Simulate auth for other types if needed
    shouldOpenAuthDialog = settings.merged.security?.auth?.selectedType === undefined;
  } else {
    console.log('[SessionInitializer] Connected to local API at http://localhost:8080');
    console.log('[SessionInitializer] Using local Qwen2.5-Omni model on Harris\'s machine');
  }
  
  // Return the initialization result with session manager and local content generator
  return {
    sessionManager,
    hasPreviousSession,
    previousContext,
    authError,
    themeError,
    shouldOpenAuthDialog,
    geminiMdFileCount: config.getGeminiMdFileCount(),
    contentGenerator, // Include the content generator that connects to local API
  };
}