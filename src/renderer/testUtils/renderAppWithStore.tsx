import { render } from "@testing-library/react";
import React from "react";
import { getApp } from "_r/App/App";
import { resetStore } from "_r/redux/reducers/store";

export const renderAppWithStore = () => {
  resetStore();
  const App = getApp();

  return render(<App />);
};
