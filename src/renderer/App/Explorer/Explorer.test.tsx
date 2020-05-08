import { screen } from "@testing-library/dom";
import { fireEvent } from "@testing-library/react";
import { initializeElectronCode } from "_tu/initializeElectronCode";
import { findAllByTestId } from "_tu/findByTestId";
import { blockchainInfoFixture1 } from "_tu/fixtures/blockchainInfoFixtures";
import * as blockFixtures from "_tu/fixtures/blockFixtures";
import { renderAppWithStore } from "_tu/renderAppWithStore";
import { startMockRpcServer } from "_tu/startMockRpcServer";

describe("Explorer view", () => {
  beforeAll(async () => {
    startMockRpcServer();
    initializeElectronCode();
    await renderAppWithStore();
  });

  it("starts by loading 20 blocks to display", async () => {
    const blocks = await findAllByTestId("blockListBlock");

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
