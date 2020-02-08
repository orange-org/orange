import "@testing-library/jest-dom/extend-expect";
import { render, waitForElement } from "@testing-library/react";
import React from "react";
import { App } from "_r/App/App";
import { rpcClientMockResponses } from "_r/rpcClient/__mocks__/RpcClientMockResponses";
import { blockchainInfoFixture1 } from "_r/rpcClient/__mocks__/blockchainInfoFixtures";
import { blockFixture1 } from "_r/rpcClient/__mocks__/blockFixtures";

jest.mock("_r/rpcClient/rpcClient");

describe("loading block list", () => {
  it("starts by loading 21 blocks to display", async () => {
    rpcClientMockResponses
      .forRequest({ method: "getblockchaininfo" })
      .queueResponse(blockchainInfoFixture1);
    rpcClientMockResponses
      .forRequest({
        method: "getblockhash",
        params: [blockchainInfoFixture1.blocks],
      })
      .queueResponse(blockFixture1.hash);
    rpcClientMockResponses
      .forRequest({
        method: "getblock",
        params: [blockFixture1.hash, 1],
      })
      .queueResponse(blockFixture1);
    // rpcClientMockResponses
    //   .forRequest({
    //     method: "getblockhash",
    //     params: [blockchainInfoFixture1.blocks],
    //   })
    //   .queueResponse(blockFixture1.hash);
    // rpcClientMockResponses
    //   .forRequest({
    //     method: "getblock",
    //     params: [blockFixture1.hash, 1],
    //   })
    //   .queueResponse(blockFixture1);
    // rpcClientMockResponses
    //   .forRequest({
    //     method: "getblockhash",
    //     params: [blockchainInfoFixture1.blocks],
    //   })
    //   .queueResponse(blockFixture1.hash);
    // rpcClientMockResponses
    //   .forRequest({
    //     method: "getblock",
    //     params: [blockFixture1.hash, 1],
    //   })
    //   .queueResponse(blockFixture1);

    const { getAllByTestId } = render(<App />);

    const blocks = await waitForElement(() =>
      getAllByTestId("blocklist-block"),
    );

    // expect(blocks).toMatchSnapshot();
    rpcClientMockResponses.close();
  });
});
