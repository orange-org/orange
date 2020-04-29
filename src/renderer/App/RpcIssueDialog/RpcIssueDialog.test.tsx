import { screen } from "@testing-library/dom";
import { cleanup, fireEvent } from "@testing-library/react";
import {
  initializeElectronCode,
  SERVER_URL,
} from "_m/startMainProcess.testHelpers";
import * as blockFixtures from "src/testUtils/fixtures/blockFixtures";
import * as transactionFixtures from "src/testUtils/fixtures/transactionFixtures";
import {
  createNockRequestResponse,
  prepareMocksForInitialHttpRequests,
} from "src/testUtils/prepareMocksForInitialHttpRequests";
import { renderAppWithStore } from "src/testUtils/renderAppWithStore";
import {
  expectNoPendingHttpRequests,
  printElement,
} from "src/testUtils/smallUtils";
import { NODE_ERROR } from "_c/constants";
import nock from "nock";
import { getDefaultNockOptions } from "src/testUtils/createNockRequestResponse";
import { matches } from "lodash";

describe("RpcIssueDialog", () => {
  /**
   * WARNING: the test cases in this block depend on each other and must
   * run sequentially
   */

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

  /**
   * The RpcIssueDialog shows up when Orange tries to make an RPC request to
   * Bitcoin Core but fails. When that happens, Orange will suspend the code,
   * bring up the RpcIssueDialog and try to get the user to fix the RPC issue.
   *
   * While the user is fixing the RPC issue, Orange will be retrying to connect
   * to Bitcoin Core repeatedly. The RpcIssueDialog UI changes based on the
   * status of these retries.
   */
  it("brings up the RpcIssueDialog when an RPC request to Bitcoin Core fails", async () => {
    const scopes: nock.Scope[] = [];

    scopes.push(
      nock(SERVER_URL)
        .post("/")
        .replyWithError({ code: NODE_ERROR.ECONNREFUSED })
        .persist(),
    );

    scopes.push(
      nock(SERVER_URL, getDefaultNockOptions())
        .post("/", matches({ method: "uptime", params: [] }))
        .replyWithError({ code: NODE_ERROR.ECONNREFUSED })
        .persist(),
    );

    const searchBox = await screen.findByLabelText("search");

    fireEvent.change(searchBox, {
      target: { value: blockFixtures.blockFixture3.hash },
    });

    fireEvent.keyUp(searchBox, { keyCode: 13 });

    expect(await screen.findByTestId("rpc-issue-dialog")).toBeVisible();

    scopes.forEach(scope => scope.persist(false));
  });

  it("starts with the connection status report page", async () => {
    expect(await screen.findByTestId("connection-status-report")).toBeVisible();
  });

  it("switches to connected when the server starts responding", () => {});

  // test("search for a block by height", async () => {
  //   const searchBox = await screen.findByLabelText("search");

  //   createNockRequestResponse(
  //     {
  //       method: "getblock",
  //       // @ts-ignore
  //       params: [blockFixtures.blockFixture2.height.toString(), 1],
  //     },
  //     null,
  //     {
  //       response: {
  //         error: {
  //           code: -8,
  //           message: "blockhash must be of length 64",
  //         },
  //       },
  //     },
  //   );

  //   createNockRequestResponse(
  //     {
  //       method: "getblockhash",
  //       params: [blockFixtures.blockFixture2.height],
  //     },
  //     blockFixtures.blockFixture2.hash,
  //   );

  //   createNockRequestResponse(
  //     {
  //       method: "getblock",
  //       params: [blockFixtures.blockFixture2.hash, 1],
  //     },
  //     blockFixtures.blockFixture2,
  //   );

  //   /**
  //    * We will start by searching for a block by height
  //    */
  //   fireEvent.change(searchBox, {
  //     target: { value: blockFixtures.blockFixture2.height },
  //   });

  //   fireEvent.keyUp(searchBox, { keyCode: 13 });

  //   /**
  //    * `h1` is showing the block height of `blockFixture2` because we searched
  //    * for it
  //    */
  //   expect(
  //     await screen.findByText(
  //       `#${blockFixtures.blockFixture2.height.toLocaleString()}`,
  //       { selector: "h1" },
  //     ),
  //   ).toBeVisible();
  // });

  // test("searching by hash", async () => {
  //   const searchBox = await screen.findByLabelText("search");

  //   createNockRequestResponse(
  //     {
  //       method: "getblock",
  //       // @ts-ignore
  //       params: [blockFixtures.blockFixture3.hash, 1],
  //     },
  //     blockFixtures.blockFixture3,
  //   );

  //   /**
  //    * We can now try searching for blockFixture3 by hash
  //    */
  //   fireEvent.change(searchBox, {
  //     target: { value: blockFixtures.blockFixture3.hash },
  //   });

  //   fireEvent.keyUp(searchBox, { keyCode: 13 });

  //   expect(
  //     await screen.findByText(
  //       `#${blockFixtures.blockFixture3.height.toLocaleString()}`,
  //       { selector: "h1" },
  //     ),
  //   ).toBeVisible();
  // });

  // test("searching by transaction", async () => {
  //   const searchBox = await screen.findByLabelText("search");

  //   createNockRequestResponse(
  //     {
  //       method: "getblock",
  //       // @ts-ignore
  //       params: [blockFixtures.blockFixture3.hash, 1],
  //     },
  //     blockFixtures.blockFixture3,
  //   );

  //   createNockRequestResponse(
  //     {
  //       method: "getblock",
  //       // @ts-ignore
  //       params: [blockFixtures.blockFixture3.tx[2], 1],
  //     },
  //     null,
  //     {
  //       response: {
  //         error: {
  //           code: -5,
  //           message: "Block not found",
  //         },
  //       },
  //     },
  //   );

  //   createNockRequestResponse(
  //     {
  //       method: "getrawtransaction",
  //       // @ts-ignore
  //       params: [blockFixtures.blockFixture3.tx[2], true],
  //     },
  //     transactionFixtures.rawTransactionFixture1,
  //   );

  //   createNockRequestResponse(
  //     {
  //       method: "getrawtransaction",
  //       // @ts-ignore
  //       params: [blockFixtures.blockFixture3.tx[2], true],
  //     },
  //     transactionFixtures.rawTransactionFixture1,
  //   );

  //   createNockRequestResponse(
  //     {
  //       method: "getrawtransaction",
  //       // @ts-ignore
  //       params: [transactionFixtures.rawTransactionFixture1.vin[0].txid, true],
  //     },
  //     transactionFixtures.rawTransactionFixture2,
  //   );

  //   fireEvent.change(searchBox, {
  //     target: { value: blockFixtures.blockFixture3.tx[2] },
  //   });

  //   fireEvent.keyUp(searchBox, { keyCode: 13 });

  //   expect(
  //     await screen.findByText("Transaction", { selector: "h2" }),
  //   ).toBeVisible();

  //   expect(
  //     await screen.findByText(blockFixtures.blockFixture3.tx[2], {
  //       selector: "p",
  //     }),
  //   ).toBeVisible();
  // });

  // test("it does not do anything if we modify the search field but try to submit with a key other than enter, like shift", async () => {
  //   const searchBox = await screen.findByLabelText("search");

  //   fireEvent.change(searchBox, {
  //     target: { value: blockFixtures.blockFixture2.hash },
  //   });

  //   fireEvent.keyUp(searchBox, { keyCode: 16 /* shift */ });

  //   /**
  //    * Although we searched for blockFixture2, blockFixture3 from
  //    * the previous test is still showing. Pressing shift didn't
  //    * trigger the search.
  //    */
  //   expect(
  //     await screen.findByText(
  //       `#${blockFixtures.blockFixture3.height.toLocaleString()}`,
  //       { selector: "h1" },
  //     ),
  //   ).toBeVisible();
  // });

  // test("it does not do anything when the search string does not return a block", async () => {
  //   const searchBox = await screen.findByLabelText("search");

  //   createNockRequestResponse(
  //     {
  //       method: "getblock",
  //       // @ts-ignore
  //       params: ["🕺", 1],
  //     },
  //     null,
  //     {
  //       response: {
  //         error: { code: -8, message: "blockhash must be of length 64" },
  //       },
  //     },
  //   );

  //   createNockRequestResponse(
  //     {
  //       method: "getrawtransaction",
  //       // @ts-ignore
  //       params: ["🕺", true],
  //     },
  //     null,
  //     {
  //       response: {
  //         error: { code: -8, message: "parameter 1 must be of length 64" },
  //       },
  //     },
  //   );

  //   createNockRequestResponse(
  //     {
  //       method: "getblockhash",
  //       // @ts-ignore
  //       params: [null],
  //     },
  //     null,
  //     {
  //       response: {
  //         error: {
  //           code: -1,
  //           message: "JSON value is not an integer as expected",
  //         },
  //       },
  //     },
  //   );

  //   fireEvent.change(searchBox, {
  //     target: { value: "🕺" },
  //   });

  //   fireEvent.keyUp(searchBox, { keyCode: 13 });

  //   /**
  //    * Same block is still displayed. Search didn't cause a change.
  //    */
  //   expect(
  //     await screen.findByText(
  //       `#${blockFixtures.blockFixture3.height.toLocaleString()}`,
  //       { selector: "h1" },
  //     ),
  //   ).toBeVisible();
  // });
});
