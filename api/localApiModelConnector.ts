/**
 * @license
 * Copyright 2025 bapX
 * SPDX-License-Identifier: Apache-2.0
 */

import { Content, GenerateContentResponse } from '@google/genai';
import type { ContentGenerator, ContentGeneratorConfig } from '../core/contentGenerator.js';
import type { Config } from '../config/config.js';

/**
 * Local API-based model connector for connecting to Harris's local API server
 * This connects to the local API that interfaces with the Qwen2.5-Omni model running on Harris's machine
 */
export class LocalApiModelConnector implements ContentGenerator {
  private apiUrl: string;
  private apiKey: string;

  constructor(private config: ContentGeneratorConfig, private cliConfig: Config) {
    // Use the local API URL for testing on Harris's machine
    this.apiUrl = config.baseUrl || 'http://localhost:8080';
    this.apiKey = config.apiKey || 'local-test-key'; // Local testing key
  }

  async generateContent(
    request: any,
    userPromptId: string,
  ): Promise<GenerateContentResponse> {
    console.log(`[LocalApiModelConnector] Generating content via local API: ${this.apiUrl}`);
    
    try {
      // Format the request to match OpenAI-compatible API format
      const messages = this.formatMessages(request);
      
      const apiRequest = {
        model: this.config.model || 'qwen2.5-omni-local',
        messages: messages,
        temperature: this.config.samplingParams?.temperature || 0.7,
        max_tokens: this.config.samplingParams?.max_tokens || 1024,
      };

      const response = await fetch(`${this.apiUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'User-Agent': 'bapXcli/1.0'
        },
        body: JSON.stringify(apiRequest)
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Format the response to match the expected interface
      return this.formatApiResponse(data);
    } catch (error) {
      console.error('[LocalApiModelConnector] Error generating content:', error);
      throw error;
    }
  }

  private formatMessages(request: any): Array<{role: string, content: string | any}> {
    // Convert the Gemini format to OpenAI format
    if (request.contents) {
      return request.contents.map((content: any) => {
        let textContent = '';
        
        if (content.parts) {
          // Handle both text and multimodal parts
          content.parts.forEach((part: any) => {
            if (part.text) {
              textContent += part.text;
            } else if (part.inlineData) {
              // Handle image/data parts
              textContent += `[Image attached: ${part.inlineData.mimeType}]`;
            }
          });
        }
        
        return {
          role: content.role === 'model' ? 'assistant' : content.role || 'user',
          content: textContent
        };
      });
    }
    
    // Fallback
    return [{ role: 'user', content: request.prompt || request.text || 'Hello' }];
  }

  private formatApiResponse(apiResponse: any): GenerateContentResponse {
    // Format API response to match the expected Gemini SDK interface
    const firstChoice = apiResponse.choices?.[0];
    
    return {
      response: {
        text: () => firstChoice?.message?.content || 'No response from model',
        functionCalls: () => [],
        functionCall: () => undefined,
        candidates: [{
          content: {
            role: 'model',
            parts: [
              { 
                text: firstChoice?.message?.content || 'No response from model'
              }
            ]
          },
          finishReason: firstChoice?.finish_reason || 'stop',
          index: 0,
          safetyRatings: [],
        }],
        promptFeedback: {
          blockReason: undefined,
          safetyRatings: [],
        }
      },
      done: async () => true,
      request: { content: {} },
      config: this.config,
    } as any;
  }

  async generateContentStream(
    request: any,
    userPromptId: string,
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    // For now, just return a single response as a generator
    // Streaming implementation would go here
    const response = await this.generateContent(request, userPromptId);
    async function* generator() {
      yield response;
    }
    return generator();
  }

  async countTokens(request: any): Promise<any> {
    try {
      const messages = this.formatMessages(request);
      
      const response = await fetch(`${this.apiUrl}/v1/chat/tokenize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.config.model || 'qwen2.5-omni-local',
          messages: messages
        })
      });

      if (!response.ok) {
        throw new Error(`Token count request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {
        totalTokens: data.count || 0
      };
    } catch (error) {
      console.error('[LocalApiModelConnector] Error counting tokens:', error);
      return { totalTokens: 0 };
    }
  }

  async embedContent(request: any): Promise<any> {
    // Embedding would be handled by the API server
    // For now return a placeholder
    return {
      embedding: {
        values: Array(384).fill(0) // Default embedding vector
      }
    };
  }
}

/**
 * Create a local API-based content generator that connects to Harris's local API server
 */
export async function createLocalApiContentGenerator(
  config: ContentGeneratorConfig,
  cliConfig: Config,
): Promise<ContentGenerator> {
  return new LocalApiModelConnector(config, cliConfig);
}