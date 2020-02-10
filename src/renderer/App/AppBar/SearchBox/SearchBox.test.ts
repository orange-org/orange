import { screen } from "@testing-library/dom";
import { cleanup, fireEvent } from "@testing-library/react";
import * as blockFixtures from "_r/rpcClient/__mocks__/blockFixtures";
import { rpcClientMockResponses } from "_r/rpcClient/__mocks__/RpcClientMockResponses";
import { prepareRpcClientInitialLoad } from "_r/testUtils/prepareRpcClientInitialLoad";
import { renderAppWithStore } from "_r/testUtils/renderAppWithStore";

describe("Searchbox", () => {
  beforeAll(() => {
    prepareRpcClientInitialLoad();
    renderAppWithStore();
  });

  afterEach(() => {
    rpcClientMockResponses.verify();
    cleanup();
  });

  it("can search by height", async () => {
    const searchBox = await screen.findByLabelText("search");
    expect(searchBox).toBeVisible();

    fireEvent.change(searchBox, {
      target: { value: blockFixtures.blockFixture2.height },
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

    fireEvent.keyUp(searchBox, { keyCode: 13 });

    expect(
      await screen.findByText(
        `#${blockFixtures.blockFixture2.height.toLocaleString()}`,
        { selector: "h1" },
      ),
    ).toBeVisible();
  });
});
