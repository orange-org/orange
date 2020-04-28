# Testing

## Notes on testing

### Testing React components

We use `@testing-library/react`. We try to always mount the top level component,
`App.tsx`, regardless of which section of the app we want to test. For example,
if we want to test the search box, we would still mount `App.tsx` and then
interact and make assertions against the search box. We do this to most closely
simulate end-user behavior.

### Testing Electron main process code

To test the Electron main process code, we mock almost everything in the
`electron` package (see [`__mocks__/electron`](./__mocks__/electron)). One of
the challenges in those tests is that they are stateful. For example, they
register listeners against `window`, `process` and other global objects. That
makes it hard to start with a fresh environment for each test. Fortunately, we
use the Jest testing framework which runs each test file in an isolated Node.js
process. So while the tests in a single file share a common environment, tests
in different files don't.

In testing Electron main process, we try to always start from the main entry
point of the app and then simulate the events that will cause our targeted test
path to be executed. For example, if we're testing an IPC event handler, we
would execute the main entry point which will register the event handler. We
then dispatch events that will run the event handler We do this to most closely
simulate real life behavior of the code.
