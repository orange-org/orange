import { render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { getApp } from "_r/App/App";
import { resetStore } from "_r/redux/reducers/store";
import { findAllByTestId } from "./findByTestId";

export const renderAppWithStore = async () => {
  resetStore();

  await act(async () => {
    const App = getApp();

    await render(<App />);

    // Wait for initial load
    try {
      await findAllByTestId("blockListBlock");
    } catch (e) {
      // No need to throw if we can't find them. Maybe we are testing
      // where the server is not loading the blocks correctly.
    }
  });
};
