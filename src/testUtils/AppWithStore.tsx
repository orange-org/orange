import { render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { getApp } from "_r/App/App";
import { TestElement } from "./TestElement";

/**
 * `createAppWithStore` was a class called `AppWithStore`, but because of its name
 * is was tripping up tools which thought it was a React class component or something.
 *
 * Changing it to a factory function, as you can see below, has solved the problem.
 */
const createAppWithStore = () => {
  let alreadyRendered = false;

  return {
    render: async () => {
      if (alreadyRendered) {
        throw new Error(
          "`renderAppWithStore` is meant to be called only once per Node.js process",
        );
      }

      alreadyRendered = true;

      await act(async () => {
        const App = getApp();

        render(<App />);

        // Wait for initial load
        try {
          await TestElement.findAllByTestId("blockListBlock");
        } catch (e) {
          // No need to throw if we can't find them. Maybe we are testing
          // where the server is not loading the blocks correctly.
        }
      });
    },
  };
};

export const appWithStore = createAppWithStore();
