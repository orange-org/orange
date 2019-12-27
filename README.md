# Orange

Orange is a UI for Bitcoin Core's `bitcoind` process. It's using Electron and TypeScript. It's not associated with the Bitcoin Core project.

## How it works

Orange is just a UI. The Bitcoin functionality all comes from [`bitcoind`](https://en.bitcoin.it/wiki/Bitcoind). When you start Orange, it starts `bitcoind` and it monitors the log messages from `bitcoind`. That's one way it knows what to display on the UI. It can also use RPC to communicate with `bitcoind`.

## Architecture and security

Because Orange is an Electron application, it has `main`, `renderer`, and `preload` Electron processes. Each one of these processes is granted a different level of access privilege over the system.

### The `main` process

In Orange the `main` process handles the native environment. It uses Node.js to talk to the file system and it can talk to the operating system. **Because `main` has this much privilege, we don't use npm modules in it.**

### The `renderer` process

`main` starts the `renderer` process. The `renderer` process is where Orange UI code actually is.

The `renderer` process has no access to Node.js APIs, the filesystem, or any operating system features. The `renderer` process is also prohibited from:

- making network requests
- loading remote content
- opening webpages
- navigating

`renderer` runs in a sandbox that has as much power over your system as a website you run in the Chrome browser, which is not much. The `renderer` process uses npm modules.

### How does `renderer` get the data to display if it's sandboxed

This is where the `preload` process comes into play. `preload` is the middleman between `main` and `renderer`. It can relay messages between the two.

`main` starts `bitcoind` and monitors log messages. `main` forwards those log messages to `preload` which in turn forwards the log messages to `renderer`.

When `renderer` wants to send an RPC message to `bitcoind`, it sends that message to `preload` which in turn forwards the message to `main` which in turn forwards the message to `bitcoind`.

### npm modules pose a security risk

While npm modules pose a security risk, we don't want to unnecessarily limit their use. The JavaScript ecosystem is rich. We want to benefit from it if we can do so safely.

The goal of this architecture is to keep Orange secure even if a compromised npm module were to slip into the code unnoticed.

### npm modules outside of the `renderer` process

Currently, the build and development steps of Orange use npm modules such as `webpack` and related plugins to generate the Orange distributable code. This poses a security risk that should be evaluated and fixed.

<details><summary>Some implementation details</summary>

We implement the [security recommendations](https://electronjs.org/docs/tutorial/security?q=j#checklist-security-recommendations) provided by Electron. Many of these recommendations are particular to loading "remote content", that is content over the network. In Orange we disable networking completely, but we consider npm modules in the `renderer` process to be equivalent to "remote content" so we follow these recommendations as strictly as possible:

- Node integration is disabled
- Content isolation is enabled
- Web security is enabled
- A strict content security policy is provided
- Running insecure content is disabled
- No experimental Chromium or Blink features are used
- WebView creation is disabled
- Navigation is disabled
- The remote module is disabled

</details>

## Decisions and rationale

### Match Bitcoin Core Qt as closely as possible

One of the main goals of this project is to explore if using TypeScript and Electron for the UI will improve the process of Bitcoin software development in general. This project is not meant to provide an alternative user experience.

## Todos

- Ban default exports
- Organize imports
- Write a cross-platform solution for copying `vendor/bitcoind` to `dist/`
- Handle error when `bitcoind` is already running
