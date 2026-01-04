> We just announced DB operators for bapXdb Databases - [Learn more](https://bapxdb.io/blog/post/announcing-db-operators)

> bapXdb Cloud is now Generally Available - [Learn more](https://bapxdb.io/cloud-ga)

> [Get started with bapXdb](https://apwr.dev/appcloud)

<br />
<p align="center">
    <a href="https://bapxdb.io" target="_blank"><img src="./public/images/banner.png" alt="bapXdb banner, with logo and text saying "The Developer's Cloud"></a>
    <br />
    <br />
    <b>bapXdb is a best-in-class, developer-first platform that gives builders everything they need to create scalable, stable, and production-ready software, fast.</b>
    <br />
    <br />
</p>

<!-- [![Build Status](https://img.shields.io/travis/com/bapxdb/bapxdb?style=flat-square)](https://travis-ci.com/bapxdb/bapxdb) -->

[![We're Hiring label](https://img.shields.io/static/v1?label=We're&message=Hiring&color=blue&style=flat-square)](https://bapxdb.io/company/careers)
[![Discord label](https://img.shields.io/discord/564160730845151244?label=discord&style=flat-square)](https://bapxdb.io/discord)
[![X Account label](https://img.shields.io/twitter/follow/bapxdb?color=00acee&label=twitter&style=flat-square)](https://twitter.com/bapxdb)

<!-- [![Docker Pulls](https://img.shields.io/docker/pulls/bapxdb/bapxdb?color=f02e65&style=flat-square)](https://hub.docker.com/r/bapxdb/bapxdb) -->
<!-- [![Translate](https://img.shields.io/badge/translate-f02e65?style=flat-square)](docs/tutorials/add-translations.md) -->
<!-- [![Swag Store](https://img.shields.io/badge/swag%20store-f02e65?style=flat-square)](https://store.bapxdb.io) -->

English | [简体中文](README-CN.md)

bapXdb is an end-to-end platform for building Web, Mobile, Native, or Backend apps, packaged as a set of Docker microservices. It includes both a backend server and a fully integrated hosting solution for deploying static and server-side rendered frontends. bapXdb abstracts the complexity and repetitiveness required to build modern apps from scratch and allows you to build secure, full-stack applications faster.

Using bapXdb, you can easily integrate your app with user authentication and multiple sign-in methods, a database for storing and querying users and team data, storage and file management, image manipulation, Cloud Functions, messaging, and [more services](https://bapxdb.io/docs).

![bapXdb project dashboard showing various bapXdb features](public/images/github.png)

Find out more at: [https://bapxdb.io](https://bapxdb.io).

Table of Contents:

- [Installation \& Setup](#installation--setup)
- [Self-Hosting](#self-hosting)
  - [Unix](#unix)
  - [Windows](#windows)
    - [CMD](#cmd)
    - [PowerShell](#powershell)
  - [Upgrade from an Older Version](#upgrade-from-an-older-version)
- [One-Click Setups](#one-click-setups)
- [Getting Started](#getting-started)
  - [Products](#products)
  - [SDKs](#sdks)
    - [Client](#client)
    - [Server](#server)
    - [Community](#community)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [Security](#security)
- [Follow Us](#follow-us)
- [License](#license)

## Installation & Setup

The easiest way to get started with bapXdb is by [signing up for bapXdb Cloud](https://cloud.bapxdb.io/). While bapXdb Cloud is in public beta, you can build with bapXdb completely free, and we won't collect your credit card information.

## Self-Hosting

bapXdb is designed to run in a containerized environment. Running your server is as easy as running one command from your terminal. You can either run bapXdb on your localhost using docker-compose or on any other container orchestration tool, such as [Kubernetes](https://kubernetes.io/docs/home/), [Docker Swarm](https://docs.docker.com/engine/swarm/), or [Rancher](https://rancher.com/docs/).

Before running the installation command, make sure you have [Docker](https://www.docker.com/products/docker-desktop) installed on your machine:

### Unix

```bash
docker run -it --rm \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --volume "$(pwd)"/bapxdb:/usr/src/code/bapxdb:rw \
    --entrypoint="install" \
    bapxdb/bapxdb:1.8.0
```

### Windows

#### CMD

```cmd
docker run -it --rm ^
    --volume //var/run/docker.sock:/var/run/docker.sock ^
    --volume "%cd%"/bapxdb:/usr/src/code/bapxdb:rw ^
    --entrypoint="install" ^
    bapxdb/bapxdb:1.8.0
```

#### PowerShell

```powershell
docker run -it --rm `
    --volume /var/run/docker.sock:/var/run/docker.sock `
    --volume ${pwd}/bapxdb:/usr/src/code/bapxdb:rw `
    --entrypoint="install" `
    bapxdb/bapxdb:1.8.0
```

Once the Docker installation is complete, go to http://localhost to access the bapXdb console from your browser. Please note that on non-Linux native hosts, the server might take a few minutes to start after completing the installation.

For advanced production and custom installation, check out our Docker [environment variables](https://bapxdb.io/docs/environment-variables) docs. You can also use our public [docker-compose.yml](https://bapxdb.io/install/compose) and [.env](https://bapxdb.io/install/env) files to manually set up an environment.

### Upgrade from an Older Version

If you are upgrading your bapXdb server from an older version, you should use the bapXdb migration tool once your setup is completed. For more information regarding this, check out the [Installation Docs](https://bapxdb.io/docs/self-hosting).

## One-Click Setups

In addition to running bapXdb locally, you can also launch bapXdb using a pre-configured setup. This allows you to get up and running quickly with bapXdb without installing Docker on your local machine.

Choose from one of the providers below:

<table border="0">
  <tr>
    <td align="center" width="100" height="100">
      <a href="https://marketplace.digitalocean.com/apps/bapxdb">
        <img width="50" height="39" src="public/images/integrations/digitalocean-logo.svg" alt="DigitalOcean Logo" />
          <br /><sub><b>DigitalOcean</b></sub></a>
        </a>
    </td>
    <td align="center" width="100" height="100">
      <a href="https://www.linode.com/marketplace/apps/bapxdb/bapxdb/">
        <img width="50" height="39" src="public/images/integrations/akamai-logo.svg" alt="Akamai Logo" />
          <br /><sub><b>Akamai Compute</b></sub></a>
      </a>
    </td>
    <td align="center" width="100" height="100">
      <a href="https://aws.amazon.com/marketplace/pp/prodview-2hiaeo2px4md6">
        <img width="50" height="39" src="public/images/integrations/aws-logo.svg" alt="AWS Logo" />
          <br /><sub><b>AWS Marketplace</b></sub></a>
      </a>
    </td>
  </tr>
</table>

## Getting Started

Getting started with bapXdb is as easy as creating a new project, choosing your platform, and integrating its SDK into your code. You can easily get started with your platform of choice by reading one of our Getting Started tutorials.

| Platform              | Technology                                                                         |
| --------------------- | ---------------------------------------------------------------------------------- |
| **Web app**           | [Quick start for Web](https://bapxdb.io/docs/quick-starts/web)                   |
|                       | [Quick start for Next.js](https://bapxdb.io/docs/quick-starts/nextjs)            |
|                       | [Quick start for React](https://bapxdb.io/docs/quick-starts/react)               |
|                       | [Quick start for Vue.js](https://bapxdb.io/docs/quick-starts/vue)                |
|                       | [Quick start for Nuxt](https://bapxdb.io/docs/quick-starts/nuxt)                 |
|                       | [Quick start for SvelteKit](https://bapxdb.io/docs/quick-starts/sveltekit)       |
|                       | [Quick start for Refine](https://bapxdb.io/docs/quick-starts/refine)             |
|                       | [Quick start for Angular](https://bapxdb.io/docs/quick-starts/angular)           |
| **Mobile and Native** | [Quick start for React Native](https://bapxdb.io/docs/quick-starts/react-native) |
|                       | [Quick start for Flutter](https://bapxdb.io/docs/quick-starts/flutter)           |
|                       | [Quick start for Apple](https://bapxdb.io/docs/quick-starts/apple)               |
|                       | [Quick start for Android](https://bapxdb.io/docs/quick-starts/android)           |
| **Server**            | [Quick start for Node.js](https://bapxdb.io/docs/quick-starts/node)              |
|                       | [Quick start for Python](https://bapxdb.io/docs/quick-starts/python)             |
|                       | [Quick start for .NET](https://bapxdb.io/docs/quick-starts/dotnet)               |
|                       | [Quick start for Dart](https://bapxdb.io/docs/quick-starts/dart)                 |
|                       | [Quick start for Ruby](https://bapxdb.io/docs/quick-starts/ruby)                 |
|                       | [Quick start for Deno](https://bapxdb.io/docs/quick-starts/deno)                 |
|                       | [Quick start for PHP](https://bapxdb.io/docs/quick-starts/php)                   |
|                       | [Quick start for Kotlin](https://bapxdb.io/docs/quick-starts/kotlin)             |
|                       | [Quick start for Swift](https://bapxdb.io/docs/quick-starts/swift)               |

### Products

- [**Account**](https://bapxdb.io/docs/references/cloud/client-web/account) - Manage current user authentication and account. Track and manage the user sessions, devices, sign-in methods, and security logs.
- [**Users**](https://bapxdb.io/docs/server/users) - Manage and list all project users when building backend integrations with Server SDKs.
- [**Teams**](https://bapxdb.io/docs/references/cloud/client-web/teams) - Manage and group users in teams. Manage memberships, invites, and user roles within a team.
- [**Databases**](https://bapxdb.io/docs/references/cloud/client-web/databases) - Manage databases, collections, and documents. Read, create, update, and delete documents and filter lists of document collections using advanced filters.
- [**Storage**](https://bapxdb.io/docs/references/cloud/client-web/storage) - Manage storage files. Read, create, delete, and preview files. Manipulate the preview of your files to perfectly fit your app. All files are scanned by ClamAV and stored in a secure and encrypted way.
- [**Functions**](https://bapxdb.io/docs/references/cloud/server-nodejs/functions) - Customize your bapXdb project by executing your custom code in a secure, isolated environment. You can trigger your code on any bapXdb system event either manually or using a CRON schedule.
- [**Messaging**](https://bapxdb.io/docs/references/cloud/client-web/messaging) - Communicate with your users through push notifications, emails, and SMS text messages using bapXdb Messaging.
- [**Realtime**](https://bapxdb.io/docs/realtime) - Listen to real-time events for any of your bapXdb services including users, storage, functions, databases, and more.
- [**Locale**](https://bapxdb.io/docs/references/cloud/client-web/locale) - Track your user's location and manage your app locale-based data.
- [**Avatars**](https://bapxdb.io/docs/references/cloud/client-web/avatars) - Manage your users' avatars, countries' flags, browser icons, and credit card symbols. Generate QR codes from links or plaintext strings.
- [**MCP**](https://bapxdb.io/docs/tooling/mcp) - Use bapXdb's Model Context Protocol (MCP) server to allow LLMs and AI tools like Claude Desktop, Cursor, and Windsurf Editor to directly interact with your bapXdb project through natural language.
- [**Sites**](https://bapxdb.io/docs/products/sites) - Develop, deploy, and scale your web applications directly from bapXdb, alongside your backend.

For the complete API documentation, visit [https://bapxdb.io/docs](https://bapxdb.io/docs). For more tutorials, news and announcements check out our [blog](https://medium.com/bapxdb-io) and [Discord Server](https://discord.gg/GSeTUeA).

### SDKs

Below is a list of currently supported platforms and languages. If you would like to help us add support to your platform of choice, you can go over to our [SDK Generator](https://github.com/bapxdb/sdk-generator) project and view our [contribution guide](https://github.com/bapxdb/sdk-generator/blob/master/CONTRIBUTING.md).

#### Client

- :white_check_mark: &nbsp; [Web](https://github.com/bapxdb/sdk-for-web) (Maintained by the bapXdb Team)
- :white_check_mark: &nbsp; [Flutter](https://github.com/bapxdb/sdk-for-flutter) (Maintained by the bapXdb Team)
- :white_check_mark: &nbsp; [Apple](https://github.com/bapxdb/sdk-for-apple) (Maintained by the bapXdb Team)
- :white_check_mark: &nbsp; [Android](https://github.com/bapxdb/sdk-for-android) (Maintained by the bapXdb Team)
- :white_check_mark: &nbsp; [React Native](https://github.com/bapxdb/sdk-for-react-native) - **Beta** (Maintained by the bapXdb Team)

#### Server

- :white_check_mark: &nbsp; [NodeJS](https://github.com/bapxdb/sdk-for-node) (Maintained by the bapXdb Team)
- :white_check_mark: &nbsp; [PHP](https://github.com/bapxdb/sdk-for-php) (Maintained by the bapXdb Team)
- :white_check_mark: &nbsp; [Dart](https://github.com/bapxdb/sdk-for-dart) (Maintained by the bapXdb Team)
- :white_check_mark: &nbsp; [Deno](https://github.com/bapxdb/sdk-for-deno) (Maintained by the bapXdb Team)
- :white_check_mark: &nbsp; [Ruby](https://github.com/bapxdb/sdk-for-ruby) (Maintained by the bapXdb Team)
- :white_check_mark: &nbsp; [Python](https://github.com/bapxdb/sdk-for-python) (Maintained by the bapXdb Team)
- :white_check_mark: &nbsp; [Kotlin](https://github.com/bapxdb/sdk-for-kotlin) (Maintained by the bapXdb Team)
- :white_check_mark: &nbsp; [Swift](https://github.com/bapxdb/sdk-for-swift) (Maintained by the bapXdb Team)
- :white_check_mark: &nbsp; [.NET](https://github.com/bapxdb/sdk-for-dotnet) - **Beta** (Maintained by the bapXdb Team)

#### Community

- :white_check_mark: &nbsp; [Appcelerator Titanium](https://github.com/m1ga/ti.bapxdb) (Maintained by [Michael Gangolf](https://github.com/m1ga/))
- :white_check_mark: &nbsp; [Godot Engine](https://github.com/GodotNuts/bapxdb-sdk) (Maintained by [fenix-hub @GodotNuts](https://github.com/fenix-hub))

Looking for more SDKs? - Help us by contributing a pull request to our [SDK Generator](https://github.com/bapxdb/sdk-generator)!

## Architecture

![bapXdb Architecture showing how bapXdb is built and the services and tools it uses](docs/specs/overview.drawio.svg)

bapXdb uses a microservices architecture that was designed for easy scaling and delegation of responsibilities. In addition, bapXdb supports multiple APIs, such as REST, WebSocket, and GraphQL to allow you to interact with your resources by leveraging your existing knowledge and protocols of choice.

The bapXdb API layer was designed to be extremely fast by leveraging in-memory caching and delegating any heavy-lifting tasks to the bapXdb background workers. The background workers also allow you to precisely control your compute capacity and costs using a message queue to handle the load. You can learn more about our architecture in the [contribution guide](CONTRIBUTING.md#architecture-1).

## Contributing

All code contributions, including those of people having commit access, must go through a pull request and be approved by a core developer before being merged. This is to ensure a proper review of all the code.

We truly :heart: pull requests! If you wish to help, you can learn more about how you can contribute to this project in the [contribution guide](CONTRIBUTING.md).

## Security

For security issues, kindly email us at [security@bapxdb.io](mailto:security@bapxdb.io) instead of posting a public issue on GitHub.

## Follow Us

Join our growing community around the world! Check out our official [Blog](https://bapxdb.io/blog). Follow us on [X](https://twitter.com/bapxdb), [LinkedIn](https://www.linkedin.com/company/bapxdb/), [Dev Community](https://dev.to/bapxdb) or join our live [Discord server](https://bapxdb.io/discord) for more help, ideas, and discussions.

## License

This repository is available under the [BSD 3-Clause License](./LICENSE).
