const { getStore } = require("_m/getStore");

/**
 * `scrollIntoView` is not implemented in JS DOM (the environment where Jest
 * tests run) so calling it during tests breaks. The code below mocks the
 * method in the prototype before the tests run.
 *
 * https://github.com/jsdom/jsdom/issues/1695
 */
window.HTMLElement.prototype.scrollIntoView = () => null;

require("@testing-library/jest-dom/extend-expect");

jest.mock("_r/rpcClient/rpcClient");
jest.mock("_m/installExtensions");
jest.mock("_m/getStore");

// Reset main process store between tests
// Do I need to put this inside an `afterEach`? 🤔
getStore.mockImplementation(() => ({}));
