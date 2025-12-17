/**
 * @license
 * Copyright 2025 bapX
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Config } from '../config/config.js';
import { SessionManager } from '../session/sessionManager.js';
import { createLocalApiContentGenerator } from '../model/localApiModelConnector.js';
import { AuthType } from '../config/auth.js';

/**
 * Initialize the content generator based on the selected authentication type
 * For Harris's local testing, this connects to his local API server
 */
export async function createContentGenerator(
  config: Config,
  gcConfig: Config,
  isInitialAuth?: boolean,
): Promise<ContentGenerator> {
  const authType = gcConfig.getAuthType();

  // For local testing on Harris's machine, always use local API connector
  if (authType === AuthType.LOCAL_MODEL || !authType) {
    console.log('[ContentGenerator] Using local API connector for Harris\'s machine');
    
    // Create configuration for the local API connector
    const apiConfig: ContentGeneratorConfig = {
      model: 'qwen2.5-omni-local',
      baseUrl: 'http://localhost:8080', // Local API server on Harris's machine
      apiKey: 'local-test-key', // Local testing key
      samplingParams: {
        temperature: 0.7,
        max_tokens: 1024,
      }
    };

    return createLocalApiContentGenerator(apiConfig, gcConfig);
  }

  // This would be for other authentication types in production
  throw new Error(`Unsupported auth type for local testing: ${authType}`);
}