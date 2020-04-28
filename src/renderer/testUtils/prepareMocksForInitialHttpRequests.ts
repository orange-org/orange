import { matches, range, defaults } from "lodash";
import nock from "nock";
import {
  PASSWORD,
  SERVER_URL,
  USERNAME,
} from "_m/startMainProcess.testHelpers";
import { blockchainInfoFixture1 } from "_r/rpcClient/__mocks__/blockchainInfoFixtures";
import * as blockFixtures from "_r/rpcClient/__mocks__/blockFixtures";
import { RpcRequest } from "_t/RpcRequests";
import { RpcResponse } from "_t/RpcResponses";

type RpcResponseResult =
  | RpcResponse["result"]
  | { error: { code: number; message: string } };

export const createNockRequestResponse = <
  T extends {
    username?: string;
    password?: string;
    response?: any;
    scope?: nock.Scope;
    statusCode?: number;
  }
>(
  body: RpcRequest,
  result: RpcResponseResult,
  options_?: T,
) => {
  const options = defaults({}, options_, {
    username: USERNAME,
    password: PASSWORD,
    response: {},
    statusCode: 200,
  });

  const scope =
    options.scope ||
    nock(SERVER_URL, {
      reqheaders: {
        authorization: `Basic ${btoa(
          `${options.username}:${options.password}`,
        )}`,
      },
    });

  const response = { ...options.response, result };

  return scope.post("/", matches(body)).reply(options.statusCode, response);
};

export const prepareMocksForInitialHttpRequests = () => {
  const scope = createNockRequestResponse(
    {
      method: "getblockchaininfo",
    },
    blockchainInfoFixture1,
  );

  /**
   * Prepare rpcClient to be able to load
   * twenty blocks.
   */
  range(1, 21).forEach(fixtureNumber => {
    // @ts-ignore
    const blockFixture = blockFixtures[`blockFixture${fixtureNumber}`] as Block;

    createNockRequestResponse(
      {
        method: "getblockhash",
        params: [blockFixture.height],
      },
      blockFixture.hash,
      { scope },
    );

    createNockRequestResponse(
      {
        method: "getblock",
        params: [blockFixture.hash, 1],
      },
      blockFixture,
      { scope },
    );
  });

  return scope;
};
