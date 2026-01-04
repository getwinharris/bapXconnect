# bapX AI 👋

![bapX AI Banner](./banner.png)

**bapX AI is an extensible, feature-rich, and user-friendly self-hosted AI platform designed to operate entirely offline.** It supports various LLM runners like **Ollama** and **OpenAI-compatible APIs**, with **built-in inference engine** for RAG, making it a **powerful AI deployment solution**.

![bapX AI Demo](./demo.png)

## Key Features of bapX AI ⭐

- 🚀 **Effortless Setup**: Install seamlessly using Docker or Kubernetes (kubectl, kustomize or helm) for a hassle-free experience.

- 🤝 **Ollama/OpenAI API Integration**: Effortlessly integrate OpenAI-compatible APIs for versatile conversations alongside Ollama models. Customize the OpenAI API URL to link with **LMStudio, GroqCloud, Mistral, OpenRouter, and more**.

- 🛡️ **Granular Permissions and User Groups**: By allowing administrators to create detailed user roles and permissions, we ensure a secure user environment. This granularity not only enhances security but also allows for customized user experiences, fostering a sense of ownership and responsibility amongst users.

- 📱 **Responsive Design**: Enjoy a seamless experience across Desktop PC, Laptop, and Mobile devices.

- 📱 **Progressive Web App (PWA) for Mobile**: Enjoy a native app-like experience on your mobile device with our PWA, providing offline access on localhost and a seamless user interface.

- ✒️🔢 **Full Markdown and LaTeX Support**: Elevate your LLM experience with comprehensive Markdown and LaTeX capabilities for enriched interaction.

- 🎤📹 **Hands-Free Voice/Video Call**: Experience seamless communication with integrated hands-free voice and video call features using multiple Speech-to-Text providers (Local Whisper, OpenAI, Deepgram, Azure) and Text-to-Speech engines (Azure, ElevenLabs, OpenAI, Transformers, WebAPI), allowing for dynamic and interactive chat environments.

- 🛠️ **Model Builder**: Easily create models via the Web UI. Create and add custom characters/agents, customize chat elements, and import models effortlessly.

- 🐍 **Native Python Function Calling Tool**: Enhance your LLMs with built-in code editor support in the tools workspace. Bring Your Own Function (BYOF) by simply adding your pure Python functions, enabling seamless integration with LLMs.

- 💾 **Persistent Artifact Storage**: Built-in key-value storage API for artifacts, enabling features like journals, trackers, leaderboards, and collaborative tools with both personal and shared data scopes across sessions.

- 📚 **Local RAG Integration**: Dive into the future of chat interactions with groundbreaking Retrieval Augmented Generation (RAG) support using your choice of 9 vector databases and multiple content extraction engines (Tika, Docling, Document Intelligence, Mistral OCR, External loaders). Load documents directly into chat or add files to your document library, effortlessly accessing them using the `#` command before a query.

- 🔍 **Web Search for RAG**: Perform web searches using 15+ providers including `SearXNG`, `Google PSE`, `Brave Search`, `Kagi`, `Mojeek`, `Tavily`, `Perplexity`, `serpstack`, `serper`, `Serply`, `DuckDuckGo`, `SearchApi`, `SerpApi`, `Bing`, `Jina`, `Exa`, `Sougou`, `Azure AI Search`, and `Ollama Cloud`, injecting results directly into your chat experience.

- 🌐 **Web Browsing Capability**: Seamlessly integrate websites into your chat experience using the `#` command followed by a URL. This feature allows you to incorporate web content directly into your conversations, enhancing the richness and depth of your interactions.

- 🎨 **Image Generation & Editing Integration**: Create and edit images using multiple engines including OpenAI's DALL-E, Gemini, ComfyUI (local), and AUTOMATIC1111 (local), with support for both generation and prompt-based editing workflows.

- ⚙️ **Many Models Conversations**: Effortlessly engage with various models simultaneously, harnessing their unique strengths for optimal responses. Enhance your experience by leveraging a diverse set of models in parallel.

- 🔐 **Role-Based Access Control (RBAC)**: Ensure secure access with restricted permissions; only authorized individuals can access your Ollama, and exclusive model creation/pulling rights are reserved for administrators.

- 🗄️ **Flexible Database & Storage Options**: Choose from SQLite (with optional encryption), PostgreSQL, or configure cloud storage backends (S3, Google Cloud Storage, Azure Blob Storage) for scalable deployments.

- 🔍 **Advanced Vector Database Support**: Select from 9 vector database options including ChromaDB, PGVector, Qdrant, Milvus, Elasticsearch, OpenSearch, Pinecone, S3Vector, and Oracle 23ai for optimal RAG performance.

- 🔐 **Enterprise Authentication**: Full support for LDAP/Active Directory integration, SCIM 2.0 automated provisioning, and SSO via trusted headers alongside OAuth providers. Enterprise-grade user and group provisioning through SCIM 2.0 protocol, enabling seamless integration with identity providers like Okta, Azure AD, and Google Workspace for automated user lifecycle management.

- ☁️ **Cloud-Native Integration**: Native support for Google Drive and OneDrive/SharePoint file picking, enabling seamless document import from enterprise cloud storage.

- 📊 **Production Observability**: Built-in OpenTelemetry support for traces, metrics, and logs, enabling comprehensive monitoring with your existing observability stack.

- ⚖️ **Horizontal Scalability**: Redis-backed session management and WebSocket support for multi-worker and multi-node deployments behind load balancers.

- 🌐🌍 **Multilingual Support**: Experience bapX AI in your preferred language with our internationalization (i18n) support. Join us in expanding our supported languages! We're actively seeking contributors!

- 🧩 **Pipelines, bapX AI Plugin Support**: Seamlessly integrate custom logic and Python libraries into bapX AI using the Pipelines Plugin Framework. Launch your Pipelines instance, set the OpenAI URL to the Pipelines URL, and explore endless possibilities. Examples include **Function Calling**, User **Rate Limiting** to control access, **Usage Monitoring** with tools like Langfuse, **Live Translation with LibreTranslate** for multilingual support, **Toxic Message Filtering** and much more.

- 🌟 **Continuous Updates**: We are committed to improving bapX AI with regular updates, fixes, and new features.

---

## How to Install 🚀

### Installation via Python pip 🐍

bapX AI can be installed using pip, the Python package installer. Before proceeding, ensure you're using **Python 3.11** to avoid compatibility issues.

1. **Install bapX AI**:
   Open your terminal and run the following command to install bapX AI dependencies:

   ```bash
   pip install -r requirements.txt
   ```

2. **Running bapX AI**:
   After installation, you can start bapX AI by executing:

   ```bash
   ./ai/bin/bapx-ai.sh start
   ```

This will start the bapX AI server, which you can access at [http://localhost:6090](http://localhost:6090)

### Quick Start with Docker 🐳

> [!WARNING]
> When using Docker to install bapX AI, make sure to include the `-v bapx-ai:/app/backend/data` in your Docker command. This step is crucial as it ensures your database is properly mounted and prevents any loss of data.

### Installation with Default Configuration

- **If Ollama is on your computer**, use this command:

  ```bash
  docker run -d -p 6090:6090 --add-host=host.docker.internal:host-gateway -v bapx-ai:/app/backend/data --name bapx-ai --restart always bapx-ai:latest
  ```

- **To run bapX AI with Nvidia GPU support**, use this command:

  ```bash
  docker run -d -p 6090:6090 --gpus all --add-host=host.docker.internal:host-gateway -v bapx-ai:/app/backend/data --name bapx-ai --restart always bapx-ai:cuda
  ```

After installation, you can access bapX AI at [http://localhost:6090](http://localhost:6090). Enjoy! 😄

---

### Using the Dev Branch 🌙

> [!WARNING]
> The `:dev` branch contains the latest unstable features and changes. Use it at your own risk as it may have bugs or incomplete features.

```bash
docker run -d -p 3000:8080 -v bapx-ui:/app/backend/data --name bapx-ui --add-host=host.docker.internal:host-gateway --restart always ghcr.io/bapx-ui/bapx-ui:dev
```

### Offline Mode

If you are running bapX AI in an offline environment, you can set the `HF_HUB_OFFLINE` environment variable to `1` to prevent attempts to download models from the internet.

```bash
export HF_HUB_OFFLINE=1
```

## What's Next? 🌟

Discover upcoming features on our roadmap in the [bapX AI Documentation](https://docs.openbapx_ui.com/roadmap/).

## License 📜

This project contains code under multiple licenses. The current codebase includes components licensed under the bapX AI License with an additional requirement to preserve the "bapX AI" branding, as well as prior contributions under their respective original licenses. For a detailed record of license changes and the applicable terms for each section of the code, please refer to [LICENSE_HISTORY](./LICENSE_HISTORY). For complete and updated licensing details, please see the [LICENSE](./LICENSE) and [LICENSE_HISTORY](./LICENSE_HISTORY) files.

## Support 💬

If you have any questions, suggestions, or need assistance, please open an issue or join our
[bapX AI Discord community](https://discord.gg/5rJgQTnV4s) to connect with us! 🤝

## Star History

<a href="https://star-history.com/#bapx-ui/bapx-ui&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=bapx-ui/bapx-ui&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=bapx-ui/bapx-ui&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=bapx-ui/bapx-ui&type=Date" />
  </picture>
</a>

---

Created by [Timothy Jaeryang Baek](https://github.com/tjbck) - Let's make bapX AI even more amazing together! 💪
