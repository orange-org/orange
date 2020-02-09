import { render } from "@testing-library/react";
import React from "react";
import { getApp } from "_r/App/App";
import { createStore } from "_r/redux/reducers/store";

export const renderAppWithStore = () => {
  const App = getApp(createStore());

  return render(<App />);
};
