import { wait } from "@testing-library/dom";
import { fireEvent } from "@testing-library/react";
import { initializeElectronCode } from "_m/startMainProcess.testHelpers";
import * as blockFixtures from "_tu/fixtures/blockFixtures";
import { renderAppWithStore } from "_tu/renderAppWithStore";
import { userEvent } from "_tu/smallUtils";
import {
  startMockErroringRpcServer,
  startMockRpcServer,
} from "_tu/startMockRpcServer";
import { dialog } from "__mocks__/electron";
import { findByTestId } from "_tu/findByTestId";

describe("RpcIssueDialog cookie dialog", () => {
  beforeAll(async () => {
    startMockRpcServer();
    initializeElectronCode();
    await renderAppWithStore();
    jest.useFakeTimers();
  });

  test("bringing up the RPC issue dialog", async () => {
    startMockErroringRpcServer();

    fireEvent.change(await findByTestId("searchInputField"), {
      target: { value: blockFixtures.blockFixture3.hash },
    });

    fireEvent.keyUp(await findByTestId("searchInputField"), {
      keyCode: 13,
    });

    expect(await findByTestId("rpcIssueDialog")).toBeInTheDocument();
  });

  test("then navigating to the server settings page", async () => {
    fireEvent.click(await findByTestId("enterServerDetails"));

    expect(await findByTestId("rpcSettingsInDialog")).toBeVisible();
  });

  test("then tuning off using default settings", async () => {
    userEvent.click(await findByTestId("useDefaultSettings"));

    await wait(async () =>
      expect(await findByTestId("useDefaultSettings")).not.toBeChecked(),
    );
  });

  test("then selecting a cookie from the open file dialog", async () => {
    dialog.showOpenDialog.mockReturnValueOnce({
      filePaths: ["/cookie-location/.cookie"],
    });

    userEvent.click(await findByTestId("setCookieFileFromDialog"));

    jest.advanceTimersByTime(2000);

    await wait(async () => {
      expect(await findByTestId("rpcSettingsFormCookieFile")).toHaveValue(
        "/cookie-location/.cookie",
      );
    });
  });

  test("then another time opening the file dialog but not selecting anything", async () => {
    dialog.showOpenDialog.mockReturnValueOnce({ filePaths: null });

    userEvent.click(await findByTestId("setCookieFileFromDialog"));

    jest.advanceTimersByTime(2000);

    await wait(async () => {
      expect(await findByTestId("rpcSettingsFormCookieFile")).toHaveValue(
        "/cookie-location/.cookie",
      );
    });
  });
});
