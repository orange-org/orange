import { render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { getApp } from "_r/App/App";
import { TestElement } from "./TestElement";

class AppWithStore {
  alreadyRendered = false;

  render = async () => {
    if (this.alreadyRendered) {
      throw new Error(
        "`renderAppWithStore` is meant to be called only once per Node.js process",
      );
    }

    this.alreadyRendered = true;

    await act(async () => {
      const App = getApp();

      await render(<App />);

      // Wait for initial load
      try {
        await TestElement.findAllByTestId("blockListBlock");
      } catch (e) {
        // No need to throw if we can't find them. Maybe we are testing
        // where the server is not loading the blocks correctly.
      }
    });
  };
}

export const appWithStore = new AppWithStore();
