# Orange

![Master](https://github.com/orange-org/orange/workflows/Master/badge.svg)

Orange aims to be a mainstream user-friendly Bitcoin payment software. The
project is under active development.

Orange is built with Electron, TypeScript and React. It uses
[Bitcoin Core](https://github.com/bitcoin/bitcoin) as its back-end.

![Orange](./docs/orange.png)

## Table of Contents

- [Goal of the project](#goal-of-the-project)
- [Install and contribute](#install-and-contribute)
- [Questions and help](#questions-and-help)

## Goal of the project

The goal is to be a mainstream payment software for merchants, power-users, and
Bitcoin enthusiasts, to deliver an integrated package of a full-node, on-chain,
and off-chain payments, with best privacy and security options as the default.
Provide a simple and modern interface to send and receive payments, free of
technical jargon and overwhelming configuration options.

And for all of this to be built on a robust and
[secure code and architecture](./SECURITY.md).

## Install and contribute

To run this locally and contribute:

1. Clone this repo
1. `cd` into the repo
1. Execute `npm install` to install the dependencies
1. Execute `npm run develop:renderer` to start the build and server for the
   `renderer` bundle. This command will occupy the terminal window
1. In a separate terminal window, but in the same folder, execute
   `npm run develop:main` to start the build process of the `main` bundle. This
   command will also occupy the terminal window
1. Orange should be running now

Feel free to play around with the code, make modifications, or send a PR!

## Questions and help

If you have a question or need help,
[file an issue](https://github.com/orange-org/orange/issues/new) or
[tweet me](https://twitter.com/msafi).
