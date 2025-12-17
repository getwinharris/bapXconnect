# bapX Ecosystem Architecture

## Overview
The bapX ecosystem consists of multiple interconnected applications that work together to provide AI capabilities with both local and cloud-based memory systems.

## Components

### bapXconnect API
- URL: https://getwinharris.github.io/bapXconnect/api
- Fixed API key: getwinharris.github.io/bapXconnect/api
- Acts as a bridge between client applications and AI models
- Current integration: Hugging Face models (Qwen2.5-Omni, Qwen2.5-Coder, Qwen3-Omni)
- Future integration: bapX server models

### Client Applications (Local Runtime)

#### bapXcoder IDE
- Repository: https://github.com/getwinharris/bapXcoder
- URL: https://coder.bapx.in
- Local runtime with project-specific session memory
- Local RAG storage for project context

#### bapXcli
- Repository: https://github.com/getwinharris/bapXcli
- Local runtime with project-specific session memory
- Local RAG storage for project context

#### Other bapX Apps
- Multiple client applications will connect to the bapXconnect API
- Each maintains local session and RAG storage

### Cloud Infrastructure

#### bapX Platform
- URL: https://bapX.in
- Cloud-based vector memory system
- Centralized RAG storage for shared knowledge

#### bapXvector
- Repository: https://github.com/getwinharris/bapXvector
- Cloud vector database for long-term memory storage
- Enables persistent memory across all client applications

## Memory Architecture

### Local Session Memory
Each client application manages its own local session storage:
- Session context specific to each project in that application
- Conversation history with UUIDs and parent-child relationships
- Local task management
- Project-specific RAG data

### Cloud Vector Memory
The bapX platform provides:
- Shared vector storage across applications
- Cloud-based RAG system
- Persistent knowledge base that transcends individual apps
- Long-term memory retention

## Model Connections

### Current (Hugging Face Integration)
Client Apps → bapXconnect API → Hugging Face Models

### Future (bapX Server Integration)  
Client Apps → bapXconnect API → bapX Server → Custom Trained Models

## API Flow
1. Client applications connect to bapXconnect API using the fixed API key
2. For local memory, each app accesses its own session storage
3. For cloud memory, apps connect to bapX.in vector system
4. Model inference requests go through the bapXconnect API to either Hugging Face (current) or bapX server (future)

## Admin Panel
- URL: https://getwinharris.github.io/bapXconnect/admin
- Login: getwinharris@gmail.com / bapX2025#
- Generate API keys for different client applications
- Configure model connections
- Monitor API usage