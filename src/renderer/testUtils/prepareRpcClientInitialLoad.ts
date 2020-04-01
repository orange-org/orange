import { range } from "lodash-es";
import { rpcClientMockResponses } from "_r/rpcClient/__mocks__/RpcClientMockResponses";
import { blockchainInfoFixture1 } from "_r/rpcClient/__mocks__/blockchainInfoFixtures";
import * as blockFixtures from "_r/rpcClient/__mocks__/blockFixtures";

export const prepareRpcClientInitialLoad = () => {
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
