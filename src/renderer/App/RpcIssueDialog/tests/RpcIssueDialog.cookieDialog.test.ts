import { wait } from "@testing-library/dom";
import { fireEvent } from "@testing-library/react";
import { MockElectron } from "_tu/MockElectron";
import * as blockFixtures from "_tu/fixtures/blockFixtures";
import { appWithStore } from "_tu/AppWithStore";
import { Utils } from "_tu/Utils";
import { MockRpcServer } from "_tu/MockRpcServer";
import { dialog } from "__mocks__/electron";
import { TestElement } from "_tu/TestElement";

jest.mock("_f/FeatureFlags", () => ({
  __esModule: true,
  FeatureFlags: {
    useBcore: true,
  },
}));

describe("RpcIssueDialog cookie dialog", () => {
  beforeAll(async () => {
    MockRpcServer.start();
    MockElectron.start();
    await appWithStore.render();
  });

  test("bringing up the RPC issue dialog", async () => {
    MockRpcServer.startErroring();

    fireEvent.change(await TestElement.findByTestId("searchInputField"), {
      target: { value: blockFixtures.blockFixture18.hash },
    });

    fireEvent.keyUp(await TestElement.findByTestId("searchInputField"), {
      keyCode: 13,
    });

    expect(
      await TestElement.findByTestId("fixBcoreConnectionDialog"),
    ).toBeInTheDocument();
  });

  test("then navigating to the server settings page", async () => {
    fireEvent.click(await TestElement.findByTestId("enterServerDetails"));

    expect(await TestElement.findByTestId("rpcSettingsInDialog")).toBeVisible();
  });

  test("then tuning off using default settings", async () => {
    Utils.userEvent.click(await TestElement.findByTestId("useDefaultSettings"));

    await wait(async () =>
      expect(
        await TestElement.findByTestId("useDefaultSettings"),
      ).not.toBeChecked(),
    );
  });

  test("then selecting a cookie from the open file dialog", async () => {
    dialog.showOpenDialog.mockReturnValueOnce({
      filePaths: ["/cookie-location/.cookie"],
    });

    Utils.userEvent.click(
      await TestElement.findByTestId("setCookiePathFromDialog"),
    );

    jest.advanceTimersByTime(2000);

    await wait(async () => {
      expect(
        await TestElement.findByTestId("rpcSettingsFromCookiePath"),
      ).toHaveValue("/cookie-location/.cookie");
    });
  });

  test("then another time opening the file dialog but not selecting anything", async () => {
    dialog.showOpenDialog.mockReturnValueOnce({ filePaths: null });

    Utils.userEvent.click(
      await TestElement.findByTestId("setCookiePathFromDialog"),
    );

    jest.advanceTimersByTime(2000);

    await wait(async () => {
      expect(
        await TestElement.findByTestId("rpcSettingsFromCookiePath"),
      ).toHaveValue("/cookie-location/.cookie");
    });
  });
});
