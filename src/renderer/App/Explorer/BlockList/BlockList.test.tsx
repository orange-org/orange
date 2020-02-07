import "@testing-library/jest-dom/extend-expect";
import { render, waitForElement } from "@testing-library/react";
import React from "react";
import { App } from "_r/App/App";

// jest.mock("axios");

describe("loading block list", () => {
  it("starts by loading 21 blocks to display", async () => {
    const { getByTestId } = render(<App />);

    const blocks = await waitForElement(() => getByTestId("blocklist-block"));

    expect(blocks).toMatchSnapshot();
  });
});
