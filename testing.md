# Testing

## Notes on testing

### Testing React components

We use `@testing-library/react`. We try to always mount the top level component,
`App.tsx`, regardless of which section of the app we want to test. For example,
if we want to test the search box, we would still mount `App.tsx` and then
interact and make assertions against the search box. We do this to most closely
simulate end-user behavior.

### Testing Electron code

To test the Electron code, we mock almost everything in the `electron` package
(see [`__mocks__/electron`](./__mocks__/electron)). One of the challenges in
those tests is that they are stateful. For example, they register listeners
against `window`, `process` and other global objects. Fortunately, we use the
Jest testing framework which runs each test file in a separate isolated process.
So while the tests in a single file share a common environment, tests in
different files don't.
