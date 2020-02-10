import { screen } from "@testing-library/dom";
import { cleanup, fireEvent } from "@testing-library/react";
import { range } from "lodash";
import { blockchainInfoFixture1 } from "_r/rpcClient/__mocks__/blockchainInfoFixtures";
import * as blockFixtures from "_r/rpcClient/__mocks__/blockFixtures";
import { rpcClientMockResponses } from "_r/rpcClient/__mocks__/RpcClientMockResponses";
import { renderAppWithStore } from "_r/testUtils/renderAppWithStore";
import { Block } from "_t/bitcoindRpcResponses";

jest.mock("_r/rpcClient/rpcClient");

const prepareRpcClientInitialLoad = () => {
  /**
   * Prepare rpcClient to be able to load
   * twenty blocks.
   */
  rpcClientMockResponses
    .forRequest({ method: "getblockchaininfo" })
    .queueResponse(blockchainInfoFixture1);

  range(1, 21).forEach(fixtureNumber => {
    // @ts-ignore
    const blockFixture = blockFixtures[`blockFixture${fixtureNumber}`] as Block;

    rpcClientMockResponses
      .forRequest({
        method: "getblockhash",
        params: [blockFixture.height],
      })
      .queueResponse(blockFixture.hash);
    rpcClientMockResponses
      .forRequest({
        method: "getblock",
        params: [blockFixture.hash, 1],
      })
      .queueResponse(blockFixture);
  });
};

describe("Explorer view", () => {
  afterEach(() => {
    rpcClientMockResponses.verify();
  });

  describe("loading block list", () => {
    afterEach(() => {
      cleanup();
    });

    it("starts by loading 20 blocks to display", async () => {
      prepareRpcClientInitialLoad();

      renderAppWithStore();

      const blocks = await screen.findAllByTestId("blocklist-block");

      expect(blocks.length).toBe(20);
    });
  });

  describe("selecting a block", () => {
    beforeAll(() => {
      prepareRpcClientInitialLoad();
      renderAppWithStore();
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
      ).toBeInTheDocument();
    });
  });
});
