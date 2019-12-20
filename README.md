# Orange

Orange is a UI for Bitcoin Core's `bitcoind` process. It's using Electron and TypeScript. It's not associated with the Bitcoin Core project.

## Decisions and rationale

### Match Bitcoin Core Qt as closely as possible

One of the main goals of this project is to explore if using TypeScript and Electron for the UI will improve the process of Bitcoin software development in general. This project is not meant to provide an alternative user experience.

## Todos:

- Ban default exports
- Organize imports
- Write a cross-platform solution for copying `vendor/bitcoind` to `dist/`
