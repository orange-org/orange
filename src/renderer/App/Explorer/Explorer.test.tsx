import { screen } from "@testing-library/dom";
import { fireEvent } from "@testing-library/react";
import { MockElectron } from "_tu/MockElectron";
import { TestElement } from "_tu/TestElement";
import { blockchainInfoFixture1 } from "_tu/fixtures/blockchainInfoFixtures";
import * as blockFixtures from "_tu/fixtures/blockFixtures";
import { appWithStore } from "_tu/AppWithStore";
import { MockRpcServer } from "_tu/MockRpcServer";

jest.mock("_f/FeatureFlags", () => ({
  __esModule: true,
  FeatureFlags: {
    useBcore: true,
  },
}));

describe("Explorer view", () => {
  beforeAll(async () => {
    MockRpcServer.start();
    MockElectron.start();
    await appWithStore.render();
  });

  it("starts by loading 20 blocks to display", async () => {
    const blocks = await TestElement.findAllByTestId("blockListBlock");

    expect(blocks.length).toBe(20);
  });

  it("displays the highest block on initial load", async () => {
    expect(
      await screen.findByText(
        `#${blockchainInfoFixture1.blocks.toLocaleString()}`,
        { selector: "h3" },
      ),
    ).toBeVisible();
  });

  it("can select another block", async () => {
    const secondFromTopHeading = `#${blockFixtures.blockFixture19.height.toLocaleString()}`;

    const secondFromTop = await screen.findByText(
      `Link to block ${blockFixtures.blockFixture19.height.toString()}`,
    );

    fireEvent.click(secondFromTop);

    expect(
      await screen.findByText(secondFromTopHeading, { selector: "h3" }),
    ).toBeVisible();
  });
});
