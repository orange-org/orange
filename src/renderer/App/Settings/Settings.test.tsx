import { act } from "@testing-library/react";
import { initializeElectronCode } from "_m/startMainProcess.testHelpers";
import { findByTestId, queryByTestId } from "_tu/findByTestId";
import { renderAppWithStore } from "_tu/renderAppWithStore";
import { userEvent } from "_tu/smallUtils";
import { startMockRpcServer } from "_tu/startMockRpcServer";

describe("Settings", () => {
  beforeAll(async () => {
    startMockRpcServer();
    initializeElectronCode();
    await renderAppWithStore();
    jest.useFakeTimers();
  });

  test("navigating to the settings page", async () => {
    userEvent.click(await findByTestId("settingsButton"));

    expect(await findByTestId("settingsPage")).toBeVisible();
  });

  test("showing a SnackBar when submitting the form", async () => {
    userEvent.click(await findByTestId("rpcSettingsSaveButton"));

    expect(await findByTestId("settingsSavedSnackBar")).toBeVisible();
  });

  test("SnackBar closing by itself after a certain time", async () => {
    act(() => {
      jest.advanceTimersByTime(7000);
    });

    expect(
      await queryByTestId("settingsSavedSnackBar"),
    ).not.toBeInTheDocument();
  });
});
