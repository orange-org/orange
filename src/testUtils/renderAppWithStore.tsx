import { render, screen } from "@testing-library/react";
import React from "react";
import { getApp } from "_r/App/App";
import { resetStore } from "_r/redux/reducers/store";
import { act } from "react-dom/test-utils";
import { findAllByTestId } from "./findByTestId";

export const renderAppWithStore = async () => {
  resetStore();

  await act(async () => {
    const App = getApp();

    await render(<App />);

    // Wait for initial load
    await findAllByTestId("blockListBlock");
  });
};
