import { render } from "@testing-library/react";
import React from "react";
import { getApp } from "_r/App/App";
import { resetStore } from "_r/redux/reducers/store";
import { act } from "react-dom/test-utils";

export const renderAppWithStore = async () => {
  resetStore();

  await act(async () => {
    const App = getApp();

    await render(<App />);
  });
};
