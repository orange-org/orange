import { TestElement } from "_tu/TestElement";
import { MockRpcServer } from "_tu/MockRpcServer";
import { MockElectron } from "_tu/MockElectron";
import { appWithStore } from "_tu/AppWithStore";
import * as blockFixtures from "_tu/fixtures/blockFixtures";
import { Utils } from "_tu/Utils";
import { fireEvent, wait } from "@testing-library/react";
import { testIds } from "_r/testIds";

jest.mock("_f/FeatureFlags", () => ({
  __esModule: true,
  FeatureFlags: {
    useBcore: true,
  },
}));

describe("BlockList", () => {
  beforeAll(async () => {
    MockRpcServer.start();
    MockElectron.start();
    await appWithStore.render();
  });

  it("indicates to the user when they are at the top of the block chain", async () => {
    expect(await TestElement.findByTestId("depthTopLink")).toHaveTextContent(
      "Top of the block chain",
    );

    expect(await TestElement.findByTestId("depthBottomLink")).toHaveTextContent(
      `There is ${blockFixtures.blockFixture1.height.toLocaleString()} lower block`,
    );
  });

  it("indicates to the user how many blocks there are higher than the highest block in the block list", async () => {
    fireEvent.change(await TestElement.findByTestId("searchInputField"), {
      target: { value: blockFixtures.blockFixture0.height },
    });

    fireEvent.keyUp(await TestElement.findByTestId("searchInputField"), {
      keyCode: 13,
    });

    await Utils.waitWithTime(async () =>
      expect(
        await TestElement.findByTestId(testIds.blockDetailsH1),
      ).toHaveTextContent(
        `#${blockFixtures.blockFixture0.height.toLocaleString()}`,
      ),
    );

    expect(await TestElement.findByTestId("depthTopLink")).toHaveTextContent(
      "There is 1 higher block",
    );
    expect(await TestElement.findByTestId("depthBottomLink")).toHaveTextContent(
      "Genesis of the block chain", // praise be to satoshi!
    );
  });

  it("focuses the search box when the depth bottom link search button is pressed", async () => {
    Utils.userEvent.click(
      await TestElement.findByTestId("depthBottomLinkSearchButton"),
    );

    await wait(async () =>
      expect(await TestElement.findByTestId("searchInputField")).toHaveFocus(),
    );
  });
});
