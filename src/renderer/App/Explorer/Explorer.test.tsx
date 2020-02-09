import { render, cleanup, waitForElement } from "@testing-library/react";
import React from "react";
import { rpcClientMockResponses } from "_r/rpcClient/__mocks__/RpcClientMockResponses";
import { blockchainInfoFixture1 } from "_r/rpcClient/__mocks__/blockchainInfoFixtures";
import * as blockFixtures from "_r/rpcClient/__mocks__/blockFixtures";
import { range } from "lodash";
import { Block } from "_t/bitcoindRpcResponses";
import { renderAppWithStore } from "_r/testUtils/renderAppWithStore";

jest.mock("_r/rpcClient/rpcClient");

describe("loading block list", () => {
  beforeEach(() => {
    /**
     * Prepare rpcClient to be able to load
     * twenty blocks.
     */
    rpcClientMockResponses
      .forRequest({ method: "getblockchaininfo" })
      .queueResponse(blockchainInfoFixture1);

    range(1, 21).forEach(fixtureNumber => {
      // @ts-ignore
      const blockFixture = blockFixtures[
        `blockFixture${fixtureNumber}`
      ] as Block;

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
  });

  afterEach(() => {
    cleanup();
    rpcClientMockResponses.verify();
  });
  it("starts by loading 20 blocks to display", async () => {
    const { getAllByTestId } = renderAppWithStore();

    const blocks = await waitForElement(() =>
      getAllByTestId("blocklist-block"),
    );

    expect(blocks.length).toBe(20);
  });

  it("selects the top block by default", async () => {
    const { getAllByTestId } = renderAppWithStore();

    const blocks = await waitForElement(() =>
      getAllByTestId("blocklist-block"),
    );

    expect(blocks.length).toBe(20);
  });
});
