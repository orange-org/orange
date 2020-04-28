import { screen } from "@testing-library/dom";
import { cleanup, fireEvent } from "@testing-library/react";
import { initializeElectronCode } from "_m/startMainProcess.testHelpers";
import * as blockFixtures from "_r/rpcClient/__mocks__/blockFixtures";
import * as transactionFixtures from "_r/rpcClient/__mocks__/transactionFixtures";
import {
  createNockRequestResponse,
  prepareMocksForInitialHttpRequests,
} from "_r/testUtils/prepareMocksForInitialHttpRequests";
import { renderAppWithStore } from "_r/testUtils/renderAppWithStore";
import { expectNoPendingHttpRequests } from "_r/testUtils/smallUtils";

describe("SearchBox", () => {
  /**
   * WARNING: the test cases in this block depend on each other and must
   * run sequentially
   */
  describe("Search flow", () => {
    beforeAll(async () => {
      initializeElectronCode(false);
      prepareMocksForInitialHttpRequests();
      await renderAppWithStore();
    });

    afterAll(() => {
      cleanup();
    });

    afterEach(async () => {
      await expectNoPendingHttpRequests();
    });

    test("app loads with the search box visible", async () => {
      /**
       * The app loads with the search box visible
       */
      const searchBox = await screen.findByLabelText("search");
      expect(searchBox).toBeVisible();
    });

    test("search for a block by height", async () => {
      const searchBox = await screen.findByLabelText("search");

      createNockRequestResponse(
        {
          method: "getblock",
          // @ts-ignore
          params: [blockFixtures.blockFixture2.height.toString(), 1],
        },
        null,
        {
          response: {
            error: {
              code: -8,
              message: "blockhash must be of length 64",
            },
          },
        },
      );

      createNockRequestResponse(
        {
          method: "getblockhash",
          params: [blockFixtures.blockFixture2.height],
        },
        blockFixtures.blockFixture2.hash,
      );

      createNockRequestResponse(
        {
          method: "getblock",
          params: [blockFixtures.blockFixture2.hash, 1],
        },
        blockFixtures.blockFixture2,
      );

      /**
       * We will start by searching for a block by height
       */
      fireEvent.change(searchBox, {
        target: { value: blockFixtures.blockFixture2.height },
      });

      fireEvent.keyUp(searchBox, { keyCode: 13 });

      /**
       * `h1` is showing the block height of `blockFixture2` because we searched
       * for it
       */
      expect(
        await screen.findByText(
          `#${blockFixtures.blockFixture2.height.toLocaleString()}`,
          { selector: "h1" },
        ),
      ).toBeVisible();
    });

    test("searching by hash", async () => {
      const searchBox = await screen.findByLabelText("search");

      createNockRequestResponse(
        {
          method: "getblock",
          // @ts-ignore
          params: [blockFixtures.blockFixture3.hash, 1],
        },
        blockFixtures.blockFixture3,
      );

      /**
       * We can now try searching for blockFixture3 by hash
       */
      fireEvent.change(searchBox, {
        target: { value: blockFixtures.blockFixture3.hash },
      });

      fireEvent.keyUp(searchBox, { keyCode: 13 });

      expect(
        await screen.findByText(
          `#${blockFixtures.blockFixture3.height.toLocaleString()}`,
          { selector: "h1" },
        ),
      ).toBeVisible();
    });

    test("searching by transaction", async () => {
      const searchBox = await screen.findByLabelText("search");

      createNockRequestResponse(
        {
          method: "getblock",
          // @ts-ignore
          params: [blockFixtures.blockFixture3.hash, 1],
        },
        blockFixtures.blockFixture3,
      );

      createNockRequestResponse(
        {
          method: "getblock",
          // @ts-ignore
          params: [blockFixtures.blockFixture3.tx[2], 1],
        },
        null,
        {
          response: {
            error: {
              code: -5,
              message: "Block not found",
            },
          },
        },
      );

      createNockRequestResponse(
        {
          method: "getrawtransaction",
          // @ts-ignore
          params: [blockFixtures.blockFixture3.tx[2], true],
        },
        transactionFixtures.rawTransactionFixture1,
      );

      createNockRequestResponse(
        {
          method: "getrawtransaction",
          // @ts-ignore
          params: [blockFixtures.blockFixture3.tx[2], true],
        },
        transactionFixtures.rawTransactionFixture1,
      );

      createNockRequestResponse(
        {
          method: "getrawtransaction",
          // @ts-ignore
          params: [
            transactionFixtures.rawTransactionFixture1.vin[0].txid,
            true,
          ],
        },
        transactionFixtures.rawTransactionFixture2,
      );

      fireEvent.change(searchBox, {
        target: { value: blockFixtures.blockFixture3.tx[2] },
      });

      fireEvent.keyUp(searchBox, { keyCode: 13 });

      expect(
        await screen.findByText("Transaction", { selector: "h2" }),
      ).toBeVisible();

      expect(
        await screen.findByText(blockFixtures.blockFixture3.tx[2], {
          selector: "p",
        }),
      ).toBeVisible();
    });

    test("it does not do anything if we modify the search field but try to submit with a key other than enter, like shift", async () => {
      const searchBox = await screen.findByLabelText("search");

      fireEvent.change(searchBox, {
        target: { value: blockFixtures.blockFixture2.hash },
      });

      fireEvent.keyUp(searchBox, { keyCode: 16 /* shift */ });

      /**
       * Although we searched for blockFixture2, blockFixture3 from
       * the previous test is still showing. Pressing shift didn't
       * trigger the search.
       */
      expect(
        await screen.findByText(
          `#${blockFixtures.blockFixture3.height.toLocaleString()}`,
          { selector: "h1" },
        ),
      ).toBeVisible();
    });

    test("it does not do anything when the search string does not return a block", async () => {
      const searchBox = await screen.findByLabelText("search");

      createNockRequestResponse(
        {
          method: "getblock",
          // @ts-ignore
          params: ["🕺", 1],
        },
        null,
        {
          response: {
            error: { code: -8, message: "blockhash must be of length 64" },
          },
        },
      );

      createNockRequestResponse(
        {
          method: "getrawtransaction",
          // @ts-ignore
          params: ["🕺", true],
        },
        null,
        {
          response: {
            error: { code: -8, message: "parameter 1 must be of length 64" },
          },
        },
      );

      createNockRequestResponse(
        {
          method: "getblockhash",
          // @ts-ignore
          params: [null],
        },
        null,
        {
          response: {
            error: {
              code: -1,
              message: "JSON value is not an integer as expected",
            },
          },
        },
      );

      fireEvent.change(searchBox, {
        target: { value: "🕺" },
      });

      fireEvent.keyUp(searchBox, { keyCode: 13 });

      /**
       * Same block is still displayed. Search didn't cause a change.
       */
      expect(
        await screen.findByText(
          `#${blockFixtures.blockFixture3.height.toLocaleString()}`,
          { selector: "h1" },
        ),
      ).toBeVisible();
    });
  });
});
