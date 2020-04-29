import { screen } from "@testing-library/dom";
import { cleanup, fireEvent } from "@testing-library/react";
import { initializeElectronCode } from "_m/startMainProcess.testHelpers";
import { blockchainInfoFixture1 } from "_tu/fixtures/blockchainInfoFixtures";
import * as blockFixtures from "_tu/fixtures/blockFixtures";
import { renderAppWithStore } from "_tu/renderAppWithStore";
import { startRpcMockServer } from "_tu/startRpcMockServer";

describe("Explorer view", () => {
  beforeAll(() => {
    startRpcMockServer();
    initializeElectronCode(false);
  });

  afterEach(() => {});

  describe("loading block list", () => {
    afterEach(() => {
      cleanup();
    });

    it("starts by loading 20 blocks to display", async () => {
      await renderAppWithStore();

      const blocks = await screen.findAllByTestId("blocklist-block");

      expect(blocks.length).toBe(20);
    });
  });

  describe("selecting a block", () => {
    beforeAll(async () => {
      await renderAppWithStore();
    });

    afterAll(() => {
      cleanup();
    });

    it("displays the highest block on initial load", async () => {
      expect(
        await screen.findByText(
          `#${blockchainInfoFixture1.blocks.toLocaleString()}`,
          { selector: "h1" },
        ),
      ).toBeVisible();
    });

    it("can select another block", async () => {
      const secondFromTopHeading = `#${blockFixtures.blockFixture2.height.toLocaleString()}`;

      const secondFromTop = await screen.findByText(
        `Link to block ${blockFixtures.blockFixture2.height.toString()}`,
      );

      fireEvent.click(secondFromTop);

      expect(
        await screen.findByText(secondFromTopHeading, { selector: "h1" }),
      ).toBeVisible();
    });
  });
});
