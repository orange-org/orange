const React = require("react");
const { Utils } = require("_m/common/Utils");

/**
 * `scrollIntoView` is not implemented in JS DOM (the environment where Jest
 * tests run) so calling it during tests breaks. The code below mocks the
 * method in the prototype before the tests run.
 *
 * https://github.com/jsdom/jsdom/issues/1695
 */
window.HTMLElement.prototype.scrollIntoView = () => null;

jest.useFakeTimers(); // Tests are a not the place to have real setTimeouts and setIntervals

/**
 * Increase Jest tests timeout from 5 to 8 seconds because sometimes they do
 * take longer
 */
jest.setTimeout(8000);

require("@testing-library/jest-dom/extend-expect");

jest.mock("fs");
jest.mock("child_process");
jest.mock("_m/ChromeExtensions/ChromeExtensions");
jest.mock("_m/common/Utils");

// `useEffect` can be problematic in testing with React Testing Library and
// Jest. The hack below helps. See https://github.com/testing-library/react-testing-library/issues/215
beforeAll(() =>
  jest.spyOn(React, "useEffect").mockImplementation(React.useLayoutEffect),
);
afterAll(() => React.useEffect.mockRestore());
