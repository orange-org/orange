import { wait } from "@testing-library/dom";
import { act, fireEvent } from "@testing-library/react";
import { vol } from "memfs";
import { RPC_ERROR } from "_r/common/constants";
import { MainRpcClient as OriginalMainRpcClient } from "_m/WindowManager/MainWindow/RpcRequestIpcEvent/MainRpcClient/MainRpcClient";
import { TestElement } from "_r/testUtils/TestElement";
import * as blockFixtures from "_r/testUtils/fixtures/blockFixtures";
import { MockElectron } from "_r/testUtils/MockElectron";
import { appWithStore } from "_r/testUtils/AppWithStore";
import { Utils } from "_r/testUtils/Utils";
import { MockRpcServer } from "_r/testUtils/MockRpcServer";

const MainRpcClient = (OriginalMainRpcClient as any) as {
  httpRequest: ReturnType<typeof jest.fn>;
};

jest.mock("_f/FeatureFlags", () => ({
  __esModule: true,
  FeatureFlags: {
    useBcore: true,
  },
}));

describe("RpcIssueDialog", () => {
  beforeAll(async () => {
    MockRpcServer.start();
    MockElectron.start();
    await appWithStore.render();
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

  it("starts with the connection status report page", async () => {
    expect(
      await TestElement.findByTestId("connectionStatusReport"),
    ).toBeVisible();
  });

  it("tells the user when the credentials are not accepted by the RPC server", async () => {
    MockRpcServer.startErroring({
      code: RPC_ERROR.unauthorized,
    });

    jest.advanceTimersByTime(2000);

    expect(await TestElement.findByTestId("unauthorizedMessage")).toBeVisible();
  });

  it("switches to server settings form when the user clicks on that button", async () => {
    fireEvent.click(await TestElement.findByTestId("enterServerDetails"));

    expect(await TestElement.findByTestId("rpcSettingsInDialog")).toBeVisible();
  });

  it("checks the default RPC configurations", async () => {
    expect(await TestElement.findByTestId("useDefaultSettings")).toBeChecked();

    jest.spyOn(MainRpcClient, "httpRequest");

    jest.advanceTimersByTime(2000);

    await wait(() => {
      expect(MainRpcClient.httpRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: MockElectron.SERVER_URL,
          options: expect.objectContaining({
            auth: `${MockElectron.USERNAME}:${MockElectron.PASSWORD}`,
          }),
        }),
      );
    });
  });

  it("can turn off use of default settings", async () => {
    Utils.userEvent.click(await TestElement.findByTestId("useDefaultSettings"));

    await wait(async () =>
      expect(
        await TestElement.findByTestId("useDefaultSettings"),
      ).not.toBeChecked(),
    );
  });

  it("shows a checkbox for using cookie authentication when use default settings is unchecked", async () => {
    expect(
      await TestElement.findByTestId("useCookieAuthentication"),
    ).toBeChecked();
  });

  it("shows an empty text field for entering cookie file", async () => {
    expect(
      await TestElement.findByTestId("rpcSettingsFromCookiePath"),
    ).toBeEmpty();
  });

  it("doesn't make RPC requests in this case", () => {
    MainRpcClient.httpRequest.mockClear();

    jest.advanceTimersByTime(2000);

    expect(MainRpcClient.httpRequest).not.toHaveBeenCalled();
  });

  it("supports specifying a cookie file path", async () => {
    vol.fromJSON({
      ...vol.toJSON(),
      "/home/.bitcoin/.cookiez": `mecookies?`,
      "/home/.bitcoin/.my-cookie": "__cookie__:1234",
    });

    await Utils.userEvent.type(
      await TestElement.findByTestId("rpcSettingsFromCookiePath"),
      "/home/.bitcoin/.cookiez",
    );

    expect(
      await TestElement.findByTestId("rpcSettingsFromCookiePath"),
    ).toHaveValue("/home/.bitcoin/.cookiez");
  });

  it('does not check with the RPC server when the cookie file contains invalid data, like "mecookies?"', async () => {
    MainRpcClient.httpRequest.mockClear();

    jest.advanceTimersByTime(2000);

    await wait(() => {
      expect(MainRpcClient.httpRequest).not.toHaveBeenCalledWith();
    });
  });

  it("starts checking with the RPC server when it has a valid cookie file with good credentials", async () => {
    MainRpcClient.httpRequest.mockClear();

    fireEvent.change(
      await TestElement.findByTestId("rpcSettingsFromCookiePath"),
      {
        target: { value: "" },
      },
    );

    await Utils.userEvent.type(
      await TestElement.findByTestId("rpcSettingsFromCookiePath"),
      "/home/.bitcoin/.my-cookie",
    );

    expect(
      await TestElement.findByTestId("rpcSettingsFromCookiePath"),
    ).toHaveValue("/home/.bitcoin/.my-cookie");

    jest.advanceTimersByTime(2000);

    await wait(() => {
      expect(MainRpcClient.httpRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: MockElectron.SERVER_URL,
          options: expect.objectContaining({
            auth: `__cookie__:1234`,
          }),
        }),
      );
    });
  });

  it("stops checking with the RPC server when an invalid URL is given", async () => {
    Utils.userEvent.clear(
      await TestElement.findByTestId("rpcSettingsFormServerUrl"),
    );
    await Utils.userEvent.type(
      await TestElement.findByTestId("rpcSettingsFormServerUrl"),
      "http",
    );

    MainRpcClient.httpRequest.mockClear();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await wait(() => expect(MainRpcClient.httpRequest).not.toHaveBeenCalled());
  });

  it("supports saving the settings to the configurations file", async () => {
    Utils.userEvent.clear(
      await TestElement.findByTestId("rpcSettingsFormServerUrl"),
    );
    await Utils.userEvent.type(
      await TestElement.findByTestId("rpcSettingsFormServerUrl"),
      MockElectron.SERVER_URL,
    );

    Utils.userEvent.click(
      await TestElement.findByTestId("rpcSettingsSaveButton"),
    );

    await wait(() => {
      expect(vol.toJSON()).toEqual(
        expect.objectContaining({
          "/platform-specific/app-path/Orange.json": JSON.stringify(
            {
              rpc: {
                cookiePath: "/home/.bitcoin/.my-cookie",
                serverUrl: MockElectron.SERVER_URL,
              },
            },
            null,
            2,
          ),
        }),
      );
    });
  });

  it("goes back to the connection status report page when the user clicks save", async () => {
    await wait(async () => {
      expect(
        await TestElement.findByTestId("connectionStatusReport"),
      ).toBeVisible();
    });
  });

  it("supports going back to the RPC settings page again", async () => {
    Utils.userEvent.click(await TestElement.findByTestId("enterServerDetails"));

    expect(await TestElement.findByTestId("rpcSettingsInDialog")).toBeVisible();
  });

  it("supports entering a username and password manually", async () => {
    await wait(async () =>
      expect(
        await TestElement.findByTestId("useDefaultSettings"),
      ).not.toBeChecked(),
    );

    Utils.userEvent.click(
      await TestElement.findByTestId("useCookieAuthentication"),
    );

    await wait(async () => {
      expect(
        await TestElement.findByTestId("useCookieAuthentication"),
      ).not.toBeChecked();
    });

    expect(
      await TestElement.findByTestId("rpcSettingsFormUsername"),
    ).toBeEmpty();
    expect(
      await TestElement.findByTestId("rpcSettingsFormPassword"),
    ).toBeEmpty();
  });

  it("automatically checks the username and password", async () => {
    MainRpcClient.httpRequest.mockClear();

    await Utils.userEvent.type(
      await TestElement.findByTestId("rpcSettingsFormUsername"),
      "hi",
    );
    await Utils.userEvent.type(
      await TestElement.findByTestId("rpcSettingsFormPassword"),
      "ho",
    );

    jest.advanceTimersByTime(2000);

    await wait(() => {
      expect(MainRpcClient.httpRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: MockElectron.SERVER_URL,
          options: expect.objectContaining({
            auth: `hi:ho`,
          }),
        }),
      );
    });
  });

  it("supports saving the username and password", async () => {
    Utils.userEvent.click(
      await TestElement.findByTestId("rpcSettingsSaveButton"),
    );

    await wait(() => {
      expect(vol.toJSON()).toEqual(
        expect.objectContaining({
          "/platform-specific/app-path/Orange.json": JSON.stringify(
            {
              rpc: {
                username: "hi",
                password: "ho",
                serverUrl: MockElectron.SERVER_URL,
              },
            },
            null,
            2,
          ),
        }),
      );
    });
  });

  it("shows saved username and password when going back to the server settings page", async () => {
    Utils.userEvent.click(await TestElement.findByTestId("enterServerDetails"));

    await wait(async () =>
      expect(
        await TestElement.findByTestId("rpcSettingsFormUsername"),
      ).toHaveValue("hi"),
    );
  });

  it("supports reverting back to using the default settings", async () => {
    await wait(async () => {
      expect(
        await TestElement.findByTestId("useDefaultSettings"),
      ).not.toBeChecked();
    });

    Utils.userEvent.click(await TestElement.findByTestId("useDefaultSettings"));
    Utils.userEvent.click(
      await TestElement.findByTestId("rpcSettingsSaveButton"),
    );

    await wait(() => {
      expect(vol.toJSON()).toEqual(
        expect.objectContaining({
          "/platform-specific/app-path/Orange.json": JSON.stringify(
            {
              rpc: null,
            },
            null,
            2,
          ),
        }),
      );
    });
  });

  it("does not allow closing the RPC issue dialog since there is still a problem with the connection", async () => {
    jest.advanceTimersByTime(2000);

    expect(
      await TestElement.findByTestId("connectionStatusReportCloseButton"),
    ).toBeDisabled();
  });

  it("enables the close button once a successful connection is made to the server", async () => {
    MockRpcServer.start();

    jest.advanceTimersByTime(2000);

    await wait(async () => {
      expect(
        await TestElement.findByTestId("connectionStatusReportCloseButton"),
      ).toBeEnabled();
    });
  });

  it("let's the user close the RPC issue dialog when RPC is connected", async () => {
    Utils.userEvent.click(
      await TestElement.findByTestId("connectionStatusReportCloseButton"),
    );

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await wait(async () =>
      expect(
        TestElement.queryByTestId("fixBcoreConnectionDialog"),
      ).not.toBeInTheDocument(),
    );
  });
});
