# Security and Architecture

Orange uses multiple processes. Some processes include npm modules while others
don't. Orange is architected so that processes with npm modules are sandboxed
and have very low access privileges. Processes with npm modules cannot make
outbound or receive inbound connections except in a very tightly controlled
manner.

Only processes that don't use any 3rd party modules are allowed to communicate
with Bitcoin Core.

## Details on the architecture

All Electron applications have 3 separate processes. The nature of these 3
processes is what enables the architecture described above.

The 3 processes are called `main`, `renderer`, and `preload`. Each one of these
processes is granted a different level of access privilege over the system, as
described below.

### The `main` process

In Orange the `main` has full access over the system. It uses Node.js to talk to
the file system and it can talk to the operating system. **Because `main` has
this much privilege, we don't use npm modules in it.**

`main` talks to Bitcoin Core.

### The `renderer` process

The `renderer` process is where the UI code is.

The `renderer` process has no access to Node.js APIs, the filesystem, or any
operating system features. The `renderer` process is also prohibited from:

- making network requests
- loading remote content (at run time)
- opening webpages
- navigating

<details><summary>Some implementation details</summary>

We implement the
[security recommendations](https://electronjs.org/docs/tutorial/security?q=j#checklist-security-recommendations)
provided by Electron. Many of these recommendations are particular to loading
"remote content", that is content over the network. In Orange we disable
networking completely, but we consider npm modules in the `renderer` process to
be equivalent to "remote content" so we follow these recommendations as strictly
as possible:

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

### How does `renderer` get the data to display if it's sandboxed?

This is where the `preload` process comes in. `preload` is the middleman between
`main` and `renderer`. It relays messages between the two, but only very
specific kinds of messages.

### How is the communication between `renderer` and `main` secured?

`main` and `renderer` use a nonce (i.e. password) to communicate with each
other. This nonce is agreed upon between `main` and `renderer` only after all
the npm modules have been downloaded, so remote code has no way of knowing what
it is.

<details><summary>Implementation details</summary>

After the npm modules have been downloaded but before the Orange distributable
is created, the string `__NONCE__` in the code will be replaced with a base64
encoded random bytes. Care has to be taken to make sure this nonce is only known
to the local Orange code, not to the npm modules.

</details>
