/**
 * @license
 * Copyright 2025 bapX
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

/**
 * Session tree structure for storing conversation history
 */
export interface SessionNode {
  id: string;
  parentId: string | null;
  timestamp: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  attachments?: string[]; // Paths to attached files
  metadata?: Record<string, any>;
}

/**
 * Structure for the session tree file
 */
export interface SessionTree {
  projectId: string;
  projectName: string;
  createdAt: string;
  lastAccessed: string;
  nodes: SessionNode[];
}

/**
 * Structure for the todo file
 */
export interface TodoItem {
  id: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  context?: string; // Context related to the task
  relatedNodes?: string[]; // IDs of related session nodes
}

export interface TodoList {
  projectId: string;
  projectName: string;
  createdAt: string;
  lastUpdated: string;
  items: TodoItem[];
}

/**
 * Structure for the RAG file
 */
export interface RagEntry {
  id: string;
  content: string;
  context: string; // Additional context for the RAG entry
  tags: string[];
  createdAt: string;
  lastAccessed: string;
  relevanceScore?: number;
}

export interface RagStorage {
  projectId: string;
  projectName: string;
  createdAt: string;
  lastUpdated: string;
  entries: RagEntry[];
}

/**
 * Session manager for handling project-specific persistent storage
 */
export class SessionManager {
  private projectPath: string;
  private sessionDir: string;

  constructor(projectPath: string = process.cwd()) {
    this.projectPath = projectPath;
    this.sessionDir = path.join(os.homedir(), '.clibapX', path.basename(projectPath));
    this.ensureSessionDir();
  }

  private ensureSessionDir(): void {
    if (!fs.existsSync(this.sessionDir)) {
      fs.mkdirSync(this.sessionDir, { recursive: true });
    }
  }

  /**
   * Load or create a session tree for the current project
   */
  loadSessionTree(): SessionTree {
    const sessionPath = path.join(this.sessionDir, 'sessontree.json');
    
    if (fs.existsSync(sessionPath)) {
      const data = fs.readFileSync(sessionPath, 'utf-8');
      return JSON.parse(data);
    }

    // Create a new session tree if it doesn't exist
    const newSession: SessionTree = {
      projectId: this.getProjectId(),
      projectName: path.basename(this.projectPath),
      createdAt: new Date().toISOString(),
      lastAccessed: new Date().toISOString(),
      nodes: []
    };

    this.saveSessionTree(newSession);
    return newSession;
  }

  /**
   * Save the session tree
   */
  saveSessionTree(sessionTree: SessionTree): void {
    sessionTree.lastAccessed = new Date().toISOString();
    const sessionPath = path.join(this.sessionDir, 'sessontree.json');
    fs.writeFileSync(sessionPath, JSON.stringify(sessionTree, null, 2));
  }

  /**
   * Load or create the todo list for the current project
   */
  loadTodoList(): TodoList {
    const todoPath = path.join(this.sessionDir, 'todo.json');
    
    if (fs.existsSync(todoPath)) {
      const data = fs.readFileSync(todoPath, 'utf-8');
      return JSON.parse(data);
    }

    // Create a new todo list if it doesn't exist
    const newTodoList: TodoList = {
      projectId: this.getProjectId(),
      projectName: path.basename(this.projectPath),
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      items: []
    };

    this.saveTodoList(newTodoList);
    return newTodoList;
  }

  /**
   * Save the todo list
   */
  saveTodoList(todoList: TodoList): void {
    todoList.lastUpdated = new Date().toISOString();
    const todoPath = path.join(this.sessionDir, 'todo.json');
    fs.writeFileSync(todoPath, JSON.stringify(todoList, null, 2));
  }

  /**
   * Load or create the RAG storage for the current project
   */
  loadRagStorage(): RagStorage {
    const ragPath = path.join(this.sessionDir, '.rag.json');
    
    if (fs.existsSync(ragPath)) {
      const data = fs.readFileSync(ragPath, 'utf-8');
      return JSON.parse(data);
    }

    // Create a new RAG storage if it doesn't exist
    const newRagStorage: RagStorage = {
      projectId: this.getProjectId(),
      projectName: path.basename(this.projectPath),
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      entries: []
    };

    this.saveRagStorage(newRagStorage);
    return newRagStorage;
  }

  /**
   * Save the RAG storage
   */
  saveRagStorage(ragStorage: RagStorage): void {
    ragStorage.lastUpdated = new Date().toISOString();
    const ragPath = path.join(this.sessionDir, '.rag.json');
    fs.writeFileSync(ragPath, JSON.stringify(ragStorage, null, 2));
  }

  /**
   * Get a unique project ID based on the project path
   */
  private getProjectId(): string {
    // Use a simple hash of the absolute path to create a consistent ID
    return this.projectPath.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0).toString();
  }

  /**
   * Add a new node to the session tree
   */
  addSessionNode(node: Omit<SessionNode, 'id' | 'timestamp'>): SessionNode {
    const sessionTree = this.loadSessionTree();
    const newNode: SessionNode = {
      ...node,
      id: this.generateId(),
      timestamp: new Date().toISOString()
    };
    
    sessionTree.nodes.push(newNode);
    this.saveSessionTree(sessionTree);
    
    return newNode;
  }

  /**
   * Add a todo item
   */
  addTodoItem(item: Omit<TodoItem, 'id' | 'createdAt' | 'updatedAt'>): TodoItem {
    const todoList = this.loadTodoList();
    const newItem: TodoItem = {
      ...item,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    todoList.items.push(newItem);
    this.saveTodoList(todoList);
    
    return newItem;
  }

  /**
   * Add a RAG entry
   */
  addRagEntry(entry: Omit<RagEntry, 'id' | 'createdAt' | 'lastAccessed'>): RagEntry {
    const ragStorage = this.loadRagStorage();
    const newEntry: RagEntry = {
      ...entry,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      lastAccessed: new Date().toISOString()
    };
    
    ragStorage.entries.push(newEntry);
    this.saveRagStorage(ragStorage);
    
    return newEntry;
  }

  /**
   * Generate a unique ID
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }

  /**
   * Search for relevant context in the session tree
   */
  searchSessionContext(query: string): SessionNode[] {
    const sessionTree = this.loadSessionTree();
    const lowerQuery = query.toLowerCase();
    
    return sessionTree.nodes.filter(node => 
      node.content.toLowerCase().includes(lowerQuery) ||
      (node.attachments && node.attachments.some(att => att.toLowerCase().includes(lowerQuery)))
    );
  }

  /**
   * Search for relevant context in the RAG storage
   */
  searchRagContext(query: string): RagEntry[] {
    const ragStorage = this.loadRagStorage();
    const lowerQuery = query.toLowerCase();
    
    return ragStorage.entries.filter(entry => 
      entry.content.toLowerCase().includes(lowerQuery) ||
      entry.context.toLowerCase().includes(lowerQuery) ||
      entry.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }
}