import * as makeRpcRequestModule from "_m/mainRpcClient/makeRpcRequest";
import { act, wait } from "@testing-library/react";
import { initializeElectronCode } from "_m/startMainProcess.testHelpers";
import { findByTestId, queryByTestId } from "_tu/findByTestId";
import { renderAppWithStore } from "_tu/renderAppWithStore";
import { userEvent } from "_tu/smallUtils";
import { startMockRpcServer } from "_tu/startMockRpcServer";
import { vol } from "memfs";

describe("Settings", () => {
  beforeAll(async () => {
    startMockRpcServer();
    initializeElectronCode();
    await renderAppWithStore();
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

  describe("trying to connect to RPC with a couple different saved configurations", () => {
    test('turning off "use default settings"', async () => {
      userEvent.click(await findByTestId("useDefaultSettings"));

      await wait(async () =>
        expect(await findByTestId("useDefaultSettings")).not.toBeChecked(),
      );
    });

    test("specifying a valid cookie file", async () => {
      vol.fromJSON({
        ...vol.toJSON(),
        "/home/.bitcoin/.my-cookie": "__cookie__:1234",
      });

      await userEvent.type(
        await findByTestId("rpcSettingsFormCookieFile"),
        "/home/.bitcoin/.my-cookie",
      );

      userEvent.click(await findByTestId("rpcSettingsSaveButton"));

      expect(await findByTestId("settingsSavedSnackBar")).toBeVisible();

      act(() => {
        jest.advanceTimersByTime(7000);
      });

      jest.spyOn(makeRpcRequestModule, "makeRpcRequest");

      userEvent.click(await findByTestId("homeButton"));
      expect(await findByTestId("explorerPage")).toBeVisible();

      expect(makeRpcRequestModule.makeRpcRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          options: expect.objectContaining({
            auth: `__cookie__:1234`,
          }),
        }),
      );
    });

    test("specifying username and password manually", async () => {
      userEvent.click(await findByTestId("settingsButton"));
      expect(await findByTestId("settingsPage")).toBeVisible();

      userEvent.click(await findByTestId("useCookieAuthentication"));

      await wait(async () => {
        expect(await findByTestId("useCookieAuthentication")).not.toBeChecked();
      });

      await userEvent.type(await findByTestId("rpcSettingsFormUsername"), "hi");
      await userEvent.type(await findByTestId("rpcSettingsFormPassword"), "ho");

      userEvent.click(await findByTestId("rpcSettingsSaveButton"));
      expect(await findByTestId("settingsSavedSnackBar")).toBeVisible();

      act(() => {
        jest.advanceTimersByTime(7000);
      });

      userEvent.click(await findByTestId("homeButton"));
      expect(await findByTestId("explorerPage")).toBeVisible();

      expect(makeRpcRequestModule.makeRpcRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          options: expect.objectContaining({
            auth: `hi:ho`,
          }),
        }),
      );
    });
  });
});
