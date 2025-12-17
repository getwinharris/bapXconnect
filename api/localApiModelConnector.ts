/**
 * @license
 * Copyright 2025 bapX
 * SPDX-License-Identifier: Apache-2.0
 */

import { Content, GenerateContentResponse } from '@google/genai';
import type { ContentGenerator, ContentGeneratorConfig } from '../core/contentGenerator.js';
import type { Config } from '../config/config.js';

/**
 * bapX API connector for connecting to the bapXconnect API server
 * This connects to the centralized API that interfaces with Hugging Face models and future bapX models
 */
export class BapXApiConnector implements ContentGenerator {
  private apiUrl: string;
  private apiKey: string;

  constructor(private config: ContentGeneratorConfig, private cliConfig: Config) {
    // Use the bapX API URL
    this.apiUrl = config.baseUrl || 'https://getwinharris.github.io/bapXconnect/api';
    this.apiKey = config.apiKey || 'getwinharris.github.io/bapXconnect/api'; // Default API key
  }

  async generateContent(
    request: any,
    userPromptId: string,
  ): Promise<GenerateContentResponse> {
    console.log(`[BapXApiConnector] Generating content via bapX API: ${this.apiUrl}`);

    try {
      // Format the request to match bapX/DashScope API format
      const input = this.formatInput(request);

      // Use Alibaba/DashScope style parameters
      const apiRequest = {
        model: this.config.model || 'qwen2.5-omni',
        input: input,
        parameters: {
          temperature: this.config.samplingParams?.temperature || 0.7,
          top_p: this.config.samplingParams?.top_p || 0.8,
          max_tokens: this.config.samplingParams?.max_tokens || 1024,
        }
      };

      const response = await fetch(`${this.apiUrl}/api/v1/text/generation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-DashScope-Token': this.apiKey, // Alibaba-style API key header
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
      console.error('[BapXApiConnector] Error generating content:', error);
      throw error;
    }
  }

  private formatInput(request: any): any {
    // Convert the Gemini format to bapX/DashScope format
    if (request.contents) {
      // Convert messages to input format expected by bapX API
      return {
        messages: request.contents.map((content: any) => {
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
        })
      };
    }

    // Fallback
    return {
      messages: [{ role: 'user', content: request.prompt || request.text || 'Hello' }]
    };
  }

  private formatApiResponse(apiResponse: any): GenerateContentResponse {
    // Format bapX API response to match the expected Gemini SDK interface
    const text = apiResponse.output?.text || apiResponse.result?.response || 'No response from model';

    return {
      response: {
        text: () => text,
        functionCalls: () => [],
        functionCall: () => undefined,
        candidates: [{
          content: {
            role: 'model',
            parts: [
              {
                text: text
              }
            ]
          },
          finishReason: apiResponse.usage?.finish_reason || 'stop',
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
      const input = this.formatInput(request);

      const response = await fetch(`${this.apiUrl}/api/v1/text/tokenize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-DashScope-Token': this.apiKey
        },
        body: JSON.stringify({
          model: this.config.model || 'qwen2.5-omni',
          input: input
        })
      });

      if (!response.ok) {
        throw new Error(`Token count request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {
        totalTokens: data.count || data.usage?.total_tokens || 0
      };
    } catch (error) {
      console.error('[BapXApiConnector] Error counting tokens:', error);
      return { totalTokens: 0 };
    }
  }

  async embedContent(request: any): Promise<any> {
    // Embedding would be handled by the bapX API server
    // For now return a placeholder
    return {
      embedding: {
        values: Array(384).fill(0) // Default embedding vector
      }
    };
  }
}

/**
 * Create a bapX API-based content generator that connects to the centralized bapX API server
 */
export async function createBapXApiContentGenerator(
  config: ContentGeneratorConfig,
  cliConfig: Config,
): Promise<ContentGenerator> {
  return new BapXApiConnector(config, cliConfig);
}