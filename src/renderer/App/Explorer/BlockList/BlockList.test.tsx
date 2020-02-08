import "@testing-library/jest-dom/extend-expect";
import { render, waitForElement } from "@testing-library/react";
import React from "react";
import { App } from "_r/App/App";
import { rpcClientMockResponses } from "_r/rpcClient/__mocks__/RpcClientMockResponses";
import { blockchainInfoFixture1 } from "_r/rpcClient/__mocks__/blockchainInfoFixtures";
import * as blockFixtures from "_r/rpcClient/__mocks__/blockFixtures";
import { range } from "lodash";
import { Block } from "_t/bitcoindRpcResponses";

jest.mock("_r/rpcClient/rpcClient");

describe("loading block list", () => {
  afterEach(() => {
    rpcClientMockResponses.verify();
  });
  it("starts by loading 20 blocks to display", async () => {
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

    const { getAllByTestId } = render(<App />);

    const blocks = await waitForElement(() =>
      getAllByTestId("blocklist-block"),
    );

    expect(blocks.length).toBe(20);
  });
});
