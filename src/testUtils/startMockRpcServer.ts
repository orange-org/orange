/* eslint-disable no-restricted-syntax */
import { matches } from "lodash";
import nock from "nock";
import { NODE_ERROR } from "_c/constants";
import { SERVER_URL } from "_tu/initializeElectronCode";
import { Block, RawTransaction } from "_t/RpcResponses";
import { blockchainInfoFixture1 } from "_tu/fixtures/blockchainInfoFixtures";
import * as blockFixtures from "_tu/fixtures/blockFixtures";
import * as transactionFixtures from "_tu/fixtures/transactionFixtures";

const findFixture = <Fixture extends RawTransaction | Block>(
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

const findBlock = (cb: (blockFixture: Block) => boolean) =>
  findFixture<Block>(cb, blockFixtures);

const findTransaction = (cb: (transactionFixture: RawTransaction) => boolean) =>
  findFixture<RawTransaction>(cb, transactionFixtures);

export const startMockErroringRpcServer = (
  error: any = { code: NODE_ERROR.ECONNREFUSED },
) => {
  nock.cleanAll();

  nock(SERVER_URL)
    .post("/")
    .replyWithError(error)
    .persist();
};

export const startMockRpcServer = () => {
  nock.cleanAll();

  nock(SERVER_URL)
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

      const block = findBlock(block_ => block_.height === height);

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

      const block = findBlock(block_ => block_.hash === blockHash);

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

      const transaction = findTransaction(
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

    .persist();
};
