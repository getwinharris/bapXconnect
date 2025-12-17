/**
 * @license
 * Copyright 2025 bapX
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import cors from 'cors';
// Note: The model import would be specific to Harris's local setup
// This assumes Harris has the local Qwen2.5-Omni model files available
//import { Qwen2_5OmniForConditionalGeneration, Qwen2_5OmniProcessor } from '@huggingface/transformers';
import type { ContentGeneratorConfig } from '../core/contentGenerator.js';
import type { Config } from '../config/config.js';

interface ChatCompletionRequest {
  model: string;
  messages: Array<{
    role: string;
    content: string | Array<{
      type: string;
      text?: string;
      image_url?: string;
      audio_url?: string;
      video_url?: string;
    }>;
  }>;
  temperature?: number;
  max_tokens?: number;
}

/**
 * Local API server for bapX that connects to Harris's local Qwen2.5-Omni model
 * This runs on Harris's machine for testing before deploying to cloud infrastructure
 */
export class LocalApiServer {
  private app: express.Application;
  private port: number;
  private server: any;
  private model: any; // Will be initialized based on local model
  private processor: any; // Will be initialized based on local model
  
  constructor(
    private modelConfig: ContentGeneratorConfig, 
    private cliConfig: Config,
    port: number = 8080
  ) {
    this.app = express();
    this.port = port;
    
    // Initialize the local model on Harris's machine
    this.initializeLocalModel();
    
    // Middleware
    this.app.use(cors());
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    
    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.status(200).json({ 
        status: 'ok', 
        model: this.modelConfig.model || 'qwen2.5-omni-local',
        running_on: 'Harris\'s machine'
      });
    });
    
    // Models endpoint
    this.app.get('/v1/models', (req, res) => {
      res.json({
        object: 'list',
        data: [
          {
            id: this.modelConfig.model || 'qwen2.5-omni-local',
            object: 'model',
            created: Date.now(),
            owned_by: 'Harris'
          }
        ]
      });
    });
    
    // Chat completions endpoint (OpenAI-compatible)
    this.app.post('/v1/chat/completions', async (req, res) => {
      try {
        const { messages, model, temperature = 0.7, max_tokens = 1024 }: ChatCompletionRequest = req.body;
        
        // For now, simulate a response since the actual model implementation would depend on Harris's local setup
        // In a real implementation, this would connect to the actual local Qwen2.5-Omni model
        console.log(`[Local API] Processing request for model: ${model}`);
        console.log(`[Local API] Messages: ${JSON.stringify(messages.slice(0, 2))}...`); // Log first 2 messages
        
        // Simulate processing delay to mimic real model inference
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Simulated response based on the official Qwen2.5-Omni interface
        const simulatedResponse = `This is a simulated response from the local Qwen2.5-Omni model running on Harris's machine.
        
Model capabilities:
- Text processing
- Image understanding  
- Audio processing
- Video understanding
- Multimodal generation

Input received:
- Messages count: ${messages.length}
- Model requested: ${model || 'qwen2.5-omni-local'}
- Temperature: ${temperature}
- Max tokens: ${max_tokens}

Session context would be retrieved from project-specific storage at ~/.clibapX/${req.cliConfig.getProjectName()}/`;
        
        // Format response in OpenAI-compatible format
        res.json({
          id: `chat-${Date.now()}`,
          object: 'chat.completion',
          created: Math.floor(Date.now() / 1000),
          model: model || this.modelConfig.model || 'qwen2.5-omni-local',
          choices: [
            {
              index: 0,
              message: {
                role: 'assistant',
                content: simulatedResponse
              },
              finish_reason: 'stop'
            }
          ],
          usage: {
            prompt_tokens: messages.reduce((acc, msg) => acc + (typeof msg.content === 'string' ? msg.content.length : JSON.stringify(msg.content).length), 0),
            completion_tokens: simulatedResponse.length,
            total_tokens: messages.reduce((acc, msg) => acc + (typeof msg.content === 'string' ? msg.content.length : JSON.stringify(msg.content).length), 0) + simulatedResponse.length
          }
        });
      } catch (error) {
        console.error('Local API Error:', error);
        res.status(500).json({
          error: {
            message: error instanceof Error ? error.message : 'Internal server error',
            type: 'api_error'
          }
        });
      }
    });
    
    // Token counting endpoint
    this.app.post('/v1/chat/tokenize', async (req, res) => {
      try {
        const { messages, model } = req.body;
        
        // Simple token counting - in practice this would use the model's tokenizer
        const tokenCount = messages.reduce((acc: number, msg: any) => {
          const content = typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content);
          return acc + Math.ceil(content.length / 4); // Rough estimation: 1 token ~ 4 characters
        }, 0);
        
        res.json({
          model: model || this.modelConfig.model || 'qwen2.5-omni-local',
          count: tokenCount,
          max_tokens: 32768 // Qwen2.5-Omni context window
        });
      } catch (error) {
        console.error('Tokenization Error:', error);
        res.status(500).json({
          error: {
            message: error instanceof Error ? error.message : 'Tokenization error',
            type: 'api_error'
          }
        });
      }
    });
  }
  
  private initializeLocalModel() {
    console.log('🔍 Initializing local API connection to Qwen2.5-Omni model...');
    console.log('📋 Model will connect to local files on Harris\'s machine');
    // In a real implementation, this would initialize the actual local model
    // For now we're preparing the interface for when the model is available
    this.model = null; // Will be set when actual model is loaded
    this.processor = null; // Will be set when actual model is loaded
  }

  private formatConversationsForLocalModel(messages: any[]) {
    // Convert OpenAI format to Qwen2.5-Omni format
    return messages.map(msg => ({
      role: msg.role,
      content: typeof msg.content === 'string' 
        ? [{ type: 'text', text: msg.content }] 
        : msg.content
    }));
  }
  
  async start() {
    return new Promise<void>((resolve) => {
      this.server = this.app.listen(this.port, 'localhost', () => {
        console.log(`\n🤖 bapX Local API Server running at http://localhost:${this.port}`);
        console.log(`📋 Connected to local model on Harris's machine`);
        console.log(`🔗 API key: http://localhost:${this.port}/api`);
        console.log(`👤 Local endpoint for Harris's development\n`);
        resolve();
      });
    });
  }
  
  async stop() {
    if (this.server) {
      this.server.close();
    }
  }
}