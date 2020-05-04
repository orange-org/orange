# Testing

The tests at Orange are mostly integration tests. The tools we use are Jest and
React Testing Library.

Each test mounts the entire `<App />` component with the full Redux store and
makes assertions against it.

For example, to test the Settings page, we mount `<App />` and navigate to the
Settings page, interact with it, and make assertions about the results.

Since `<App />` represents the entire application, it needs the Electron `main`
process to be running as well as the Bitcoin Core server. We use Jest's mocking
system to [mock Electron's internals](./__mocks__/electron). But our
[`main`](./src/main) process code does get exercised in these tests because the
mocked Electron internals do provide a working glue with the `main` process. As
for the Bitcoin Core server, we use `nock` as you can see
[here](./src/testUtils/startMockRpcServer.ts).

## Advantages and disadvantages

This kind of testing has great advantages but also significant disadvantages.

One of the main advantages is that the tests very closely resemble the real life
execution of the app. It's a hybrid between unit tests and full end-to-end
tests. They are much easier to work with and are faster than end-to-end tests.

Another advantage is that as a result of testing at the entry-point of the
application while not mocking the dependencies is that we get realistic and
comprehensive test coverage. For example, we only test UI interactions but as a
result all the code that the UI components depend on, such as Redux, `main`
process, etc, get indirectly covered and tested. If any of these components
malfunction, the tests would fail. Just like what would happen in a production
environment.

The main disadvantage of these tests is that they are extremely difficult to
write and debug because you are mounting the entire application, interacting
with it, and making assertions against it without being able to visually see
what's happening. Combine this with the quirks of Jest, React Testing Library,
and React itself, and you'll have a pretty challenging situation.

In the end, however, if we're going to spend time writing tests, I would rather
have tests that actually give a high amount of confidence that the software is
working as intended. And this kind of testing is great at that, despite its
disadvantages.
