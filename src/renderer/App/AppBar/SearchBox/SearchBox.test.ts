import { screen } from "@testing-library/dom";
import { cleanup, fireEvent } from "@testing-library/react";
import * as blockFixtures from "_r/rpcClient/__mocks__/blockFixtures";
import { rpcClientMockResponses } from "_r/rpcClient/__mocks__/RpcClientMockResponses";
import { prepareRpcClientInitialLoad } from "_r/testUtils/prepareRpcClientInitialLoad";
import { renderAppWithStore } from "_r/testUtils/renderAppWithStore";

describe("SearchBox", () => {
  beforeAll(() => {
    prepareRpcClientInitialLoad();
    renderAppWithStore();
  });

  afterAll(() => {
    rpcClientMockResponses.verify();
    cleanup();
  });

  test("search flow", async () => {
    /**
     * The app loads with the search box visible
     */
    const searchBox = await screen.findByLabelText("search");
    expect(searchBox).toBeVisible();

    rpcClientMockResponses
      .forRequest({
        method: "getblock",
        // @ts-ignore
        params: [blockFixtures.blockFixture2.height.toString(), 1],
      })
      .queueResponse({
        error: {
          code: -8,
          message: "blockhash must be of length 64",
        },
      });

    rpcClientMockResponses
      .forRequest({
        method: "getblockhash",
        params: [blockFixtures.blockFixture2.height],
      })
      .queueResponse(blockFixtures.blockFixture2.hash);
    rpcClientMockResponses
      .forRequest({
        method: "getblock",
        params: [blockFixtures.blockFixture2.hash, 1],
      })
      .queueResponse(blockFixtures.blockFixture2);

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

    rpcClientMockResponses
      .forRequest({
        method: "getblock",
        // @ts-ignore
        params: [blockFixtures.blockFixture3.hash, 1],
      })
      .queueResponse(blockFixtures.blockFixture3);

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

    /**
     * It doesn't do anything if we modify the search field but try to submit
     * with a key other than enter, like shift
     */
    rpcClientMockResponses
      .forRequest({
        method: "getblock",
        // @ts-ignore
        params: [blockFixtures.blockFixture2.hash, 1],
      })
      .queueResponse(blockFixtures.blockFixture2);

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

    /**
     * it doesn't do anything when the search string doesn't return a block
     */
    rpcClientMockResponses
      .forRequest({
        method: "getblock",
        // @ts-ignore
        params: ["🕺", 1],
      })
      .queueResponse({
        error: { code: -8, message: "blockhash must be of length 64" },
      });

    rpcClientMockResponses
      .forRequest({
        method: "getblockhash",
        // @ts-ignore
        params: [NaN],
      })
      .queueResponse({
        error: {
          code: -1,
          message: "JSON value is not an integer as expected",
        },
      });

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
