import { findByTestId } from "_tu/findByTestId";
import { startMockRpcServer } from "_tu/startMockRpcServer";
import { initializeElectronCode } from "_tu/initializeElectronCode";
import { renderAppWithStore } from "_tu/renderAppWithStore";
import * as blockFixtures from "_tu/fixtures/blockFixtures";
import { userEvent, waitWithTime } from "_tu/smallUtils";
import { fireEvent, wait } from "@testing-library/react";
import { testIds } from "_tu/testIds";

jest.mock("_f/featureFlags", () => ({
  __esModule: true,
  featureFlags: {
    useBcore: true,
  },
}));

describe("BlockList", () => {
  beforeAll(async () => {
    startMockRpcServer();
    initializeElectronCode();
    await renderAppWithStore();
  });

  it("indicates to the user when they are at the top of the block chain", async () => {
    expect(await findByTestId("depthTopLink")).toHaveTextContent(
      "Top of the block chain",
    );

    expect(await findByTestId("depthBottomLink")).toHaveTextContent(
      `There is ${blockFixtures.blockFixture1.height.toLocaleString()} lower block`,
    );
  });

  it("indicates to the user how many blocks there are higher than the highest block in the block list", async () => {
    fireEvent.change(await findByTestId("searchInputField"), {
      target: { value: blockFixtures.blockFixture0.height },
    });

    fireEvent.keyUp(await findByTestId("searchInputField"), { keyCode: 13 });

    await waitWithTime(async () =>
      expect(await findByTestId(testIds.blockDetailsH1)).toHaveTextContent(
        `#${blockFixtures.blockFixture0.height.toLocaleString()}`,
      ),
    );

    expect(await findByTestId("depthTopLink")).toHaveTextContent(
      "There is 1 higher block",
    );
    expect(await findByTestId("depthBottomLink")).toHaveTextContent(
      "Genesis of the block chain", // praise be to satoshi!
    );
  });

  it("focuses the search box when the depth bottom link search button is pressed", async () => {
    userEvent.click(await findByTestId("depthBottomLinkSearchButton"));

    await wait(async () =>
      expect(await findByTestId("searchInputField")).toHaveFocus(),
    );
  });
});
