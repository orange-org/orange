/* eslint-disable no-restricted-syntax */
import { matches } from "lodash";
import nock from "nock";
import { Constants } from "_c/constants";
import { MockElectron } from "_tu/MockElectron";
import { Block, RawTransaction } from "_t/RpcResponses";
import { blockchainInfoFixture1 } from "_tu/fixtures/blockchainInfoFixtures";
import * as blockFixtures from "_tu/fixtures/blockFixtures";
import * as transactionFixtures from "_tu/fixtures/transactionFixtures";
import { mempoolFixture01 } from "./fixtures/mempoolFixtures";

export class MockRpcServer {
  private static findFixture = <Fixture extends RawTransaction | Block>(
    cb: (fixture: Fixture) => boolean,
    fixtures: any,
  ): Fixture | null => {
    let foundFixture: Fixture | null = null;

    Object.keys(fixtures).forEach(fixtureKey => {
      if (foundFixture) {
        return;
      }

      const fixture = fixtures[fixtureKey] as Fixture;

      if (cb(fixture) === true) {
        foundFixture = fixture;
      }
    });

    return foundFixture;
  };

  private static findBlock = (cb: (blockFixture: Block) => boolean) =>
    MockRpcServer.findFixture<Block>(cb, blockFixtures);

  private static findTransaction = (
    cb: (transactionFixture: RawTransaction) => boolean,
  ) => MockRpcServer.findFixture<RawTransaction>(cb, transactionFixtures);

  static startErroring = (
    error: any = { code: Constants.nodeError.ECONNREFUSED },
  ) => {
    nock.cleanAll();

    nock(MockElectron.SERVER_URL)
      .post("/")
      .replyWithError(error)
      .persist();
  };

  static start = () => {
    nock.cleanAll();

    nock(MockElectron.SERVER_URL)
      .post("/", matches({ method: "getblockchaininfo" }))
      .reply(200, {
        error: null,
        result: blockchainInfoFixture1,
      })

      // /////////////////////

      .post(
        "/",
        matches({
          method: "getblockhash",
        }),
      )
      .reply((_uri, requestBody) => {
        const parsedRequestBody = JSON.parse(requestBody as any);
        const height = parsedRequestBody.params?.[0];

        if (Number.isNaN(parseInt(height, 16))) {
          return [
            200,
            {
              error: {
                code: -1,
                message: "JSON value is not an integer as expected",
              },
              result: null,
            },
          ];
        }

        const block = MockRpcServer.findBlock(
          block_ => block_.height === height,
        );

        if (block) {
          return [200, { error: null, result: block.hash }];
        }

        throw new Error(`cant process ${requestBody}`);
      })

      // /////////////////////////////

      .post(
        "/",
        matches({
          method: "getblock",
        }),
      )
      .reply((_uri, requestBody) => {
        const parsedRequestBody = JSON.parse(requestBody as any);
        const blockHash = parsedRequestBody.params?.[0];

        if (blockHash?.length < 64) {
          return [
            200,
            {
              error: { code: -8, message: "blockhash must be of length 64" },
              result: null,
            },
          ];
        }

        const block = MockRpcServer.findBlock(
          block_ => block_.hash === blockHash,
        );

        if (block) {
          return [200, { error: null, result: block }];
        }

        return [
          404,
          {
            error: {
              code: -5,
              message: "Block not found",
            },
          },
        ];
      })

      // ///////////////////////////

      .post("/", matches({ method: "getrawtransaction" }))
      .reply((_uri, requestBody) => {
        const parsedRequestBody = JSON.parse(requestBody as any);
        const transactionId = parsedRequestBody.params?.[0];

        if (transactionId?.length < 64) {
          return [
            200,
            {
              error: { code: -8, message: "parameter 1 must be of length 64" },
              result: null,
            },
          ];
        }

        const transaction = MockRpcServer.findTransaction(
          transaction_ => transaction_.txid === transactionId,
        );

        if (transaction) {
          return [200, { error: null, result: transaction }];
        }

        throw new Error(`Can't process ${requestBody}`);
      })

      // //////////////////

      .post("/", matches({ method: "uptime" }))
      .reply(200, { error: null, result: 1234 })

      // //////////////////

      .post("/", matches({ method: "getmempoolinfo" }))
      .reply(200, { error: null, result: mempoolFixture01 })

      .persist();
  };
}
