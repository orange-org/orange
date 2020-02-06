import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { App } from "./App";

import "@testing-library/jest-dom/extend-expect";

test("loads and displays greeting", () => {
  const rendered = render(<App />);

  console.log("rendered", rendered);
});
