import { MainRpcClient as OriginalMainRpcClient } from "_m/WindowManager/MainWindow/RpcRequestIpcEvent/MainRpcClient/MainRpcClient";
import { act, wait } from "@testing-library/react";
import { MockElectron } from "_tu/MockElectron";
import { TestElement } from "_tu/TestElement";
import { appWithStore } from "_tu/AppWithStore";
import { Utils } from "_tu/Utils";
import { MockRpcServer } from "_tu/MockRpcServer";
import { vol } from "memfs";

const MainRpcClient = (OriginalMainRpcClient as any) as {
  httpRequest: ReturnType<typeof jest.fn>;
};

jest.mock("_f/FeatureFlags", () => ({
  __esModule: true,
  FeatureFlags: {
    useBcore: true,
  },
}));

describe("Settings", () => {
  beforeAll(async () => {
    MockRpcServer.start();
    MockElectron.start();
    await appWithStore.render();
  });

  test("navigating to the settings page", async () => {
    Utils.userEvent.click(await TestElement.findByTestId("settingsButton"));

    expect(await TestElement.findByTestId("settingsPage")).toBeVisible();
  });

  test("showing a SnackBar when submitting the form", async () => {
    Utils.userEvent.click(
      await TestElement.findByTestId("rpcSettingsSaveButton"),
    );

    expect(
      await TestElement.findByTestId("settingsSavedSnackBar"),
    ).toBeVisible();
  });

  test("SnackBar closing by itself after a certain time", async () => {
    act(() => {
      jest.advanceTimersByTime(7000);
    });

    expect(
      await TestElement.queryByTestId("settingsSavedSnackBar"),
    ).not.toBeInTheDocument();
  });

  describe("trying to connect to RPC with a couple different saved configurations", () => {
    test('turning off "use default settings"', async () => {
      Utils.userEvent.click(
        await TestElement.findByTestId("useDefaultSettings"),
      );

      await wait(async () =>
        expect(
          await TestElement.findByTestId("useDefaultSettings"),
        ).not.toBeChecked(),
      );
    });

    test("specifying a valid cookie file", async () => {
      vol.fromJSON({
        ...vol.toJSON(),
        "/home/.bitcoin/.my-cookie": "__cookie__:1234",
      });

      await Utils.userEvent.type(
        await TestElement.findByTestId("rpcSettingsFromCookiePath"),
        "/home/.bitcoin/.my-cookie",
      );

      Utils.userEvent.click(
        await TestElement.findByTestId("rpcSettingsSaveButton"),
      );

      expect(
        await TestElement.findByTestId("settingsSavedSnackBar"),
      ).toBeVisible();

      act(() => {
        jest.advanceTimersByTime(7000);
      });

      jest.spyOn(MainRpcClient, "httpRequest");

      Utils.userEvent.click(await TestElement.findByTestId("homeButton"));
      expect(await TestElement.findByTestId("explorerPage")).toBeVisible();

      expect(MainRpcClient.httpRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          options: expect.objectContaining({
            auth: `__cookie__:1234`,
          }),
        }),
      );
    });

    test("specifying username and password manually", async () => {
      Utils.userEvent.click(await TestElement.findByTestId("settingsButton"));
      expect(await TestElement.findByTestId("settingsPage")).toBeVisible();

      Utils.userEvent.click(
        await TestElement.findByTestId("useCookieAuthentication"),
      );

      await wait(async () => {
        expect(
          await TestElement.findByTestId("useCookieAuthentication"),
        ).not.toBeChecked();
      });

      await Utils.userEvent.type(
        await TestElement.findByTestId("rpcSettingsFormUsername"),
        "hi",
      );
      await Utils.userEvent.type(
        await TestElement.findByTestId("rpcSettingsFormPassword"),
        "ho",
      );

      Utils.userEvent.click(
        await TestElement.findByTestId("rpcSettingsSaveButton"),
      );
      expect(
        await TestElement.findByTestId("settingsSavedSnackBar"),
      ).toBeVisible();

      act(() => {
        jest.advanceTimersByTime(7000);
      });

      Utils.userEvent.click(await TestElement.findByTestId("homeButton"));
      expect(await TestElement.findByTestId("explorerPage")).toBeVisible();

      expect(MainRpcClient.httpRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          options: expect.objectContaining({
            auth: `hi:ho`,
          }),
        }),
      );
    });
  });
});
