# bapX Media Hub | Branding & Architecture Standards

This document outlines the visual, strategic, and architectural standards for **bapX Media Hub**. All future developments must strictly adhere to these patterns to maintain a cohesive, elite, and high-performance ecosystem.

## 1. Core Identity & Terminology

- **Project Name:** bapX
- **Organization:** bapX Media Hub
- **Primary Messaging:** "Storage as Compute for Modern Apps"
- **Key Paradigm:** **Storage as Compute**. We eliminate the separation between data and execution. Code runs directly on the storage layer for zero-latency orchestration.
- **Identity Mapping:** Replaces traditional "Authentication" and "Data Compression". It refers to the sovereign, high-efficiency link between a user's identity and their distributed data assets.
- **Sovereign Core:** The engine powering Identity Mapping, Storage Hubs, and WASM Edge functions.

## 2. Color Palette

bapX uses a strict **Dark/Purple** theme designed for maximum clarity and sophisticated visual appeal.

| Element | Color Code | Description |
| :--- | :--- | :--- |
| **Background** | `#0a0a0a` | Deep obsidian base |
| **Surface (Cards)** | `#121212` | Slightly elevated background for UI elements |
| **Accent (Purple)** | `#a855f7` | Primary brand color (Tailwind Purple-500) |
| **Accent (Glow)** | `rgba(168, 85, 247, 0.15)` | Used for mesh-glow effects and hover states |
| **Text (Primary)** | `#ffffff` | High contrast for readability |
| **Text (Dim)** | `#9ca3af` | Secondary information (Tailwind Gray-400) |
| **Border (Muted)** | `rgba(255, 255, 255, 0.1)` | Subtle dividers and container borders |

## 3. Pricing Strategy (Tiered & Modular)

bapX is positioned as a high-value, high-performance alternative to Supabase and Firebase, offering better unit economics through our "Storage as Compute" architecture.

| Plan | Price | Focus |
| :--- | :--- | :--- |
| **Always Free** | $0 | Prototyping and Hobbyists |
| **Pilot** | $15/mo | Production startups (Cheaper than Supabase Pro) |
| **Sovereign** | $49/mo | Scaled applications with modular storage hubs |
| **Omni-Core** | Custom | Enterprise-grade global orchestration |

*Note: Pilot plan is strategically priced at $15 to undercut Supabase ($25) while offering 2.5x more storage and bandwidth.*

## 4. Domain & Architecture Strategy

### Administrative Services (Prefix)
- `ai.bapx.in` - Open WebUI Hub with integrated API key generation in settings.

### User Project Ecosystem (Suffix)
- Every project is assigned a high-authority suffix: `bapx.[project-name].in`
- **Unified API:** Generate and manage project-level API keys directly within the project settings or `ai.bapx.in`.
- This ensures clear separation from core bapX infrastructure while providing a professional digital identity.

## 5. Model & Intelligence Orchestration
- **Model Weights:** Stored in the `/model` directory within the project repository.
- **Database Link:** `ai.bapx.in` (Open WebUI) is wired directly to the storage-as-compute engine for RAG and memory.
- **Intelligence Stack:** Transitioned from legacy automation to an API-first intelligence layer where local models are exposed via standard APIs.

## 5. UI Components

### Mesh-Glow Effect
All landing and top-level pages should include a subtle mesh-glow background element:
```css
.mesh-glow {
    position: fixed;
    top: -20%;
    left: -10%;
    width: 60%;
    height: 60%;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%);
    filter: blur(100px);
    z-index: -1;
    pointer-events: none;
}
```

### Cards
Cards should be used for grouping related content and providing visual hierarchy.
```css
.card {
    background: var(--surface);
    border: 1px solid var(--border-muted);
    border-radius: 16px;
    padding: 2rem;
    transition: all 0.3s ease;
}
.card:hover {
    border-color: var(--accent-purple);
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.1);
}
```

## 6. SEO & AI Optimization (AJO)

- **AI Search Optimization (AJO):** Content must be structured with clear headings, technical depth, and specific competitive comparisons (e.g., bapX vs. Supabase).
- **SEO Standards:** Every page must contain high-relevance title, description, and OpenGraph tags pointing to `../logo/bapXmain.png`.
- **Favicon:** Always use `../logo/bapXfavicon.png`.
