import { screen, wait } from "@testing-library/dom";
import { cleanup, fireEvent, act } from "@testing-library/react";
import { vol } from "memfs";
import { RPC_ERROR } from "_c/constants";
import * as makeRpcRequestModule from "_m/mainRpcClient/makeRpcRequest";
import {
  initializeElectronCode,
  PASSWORD,
  SERVER_URL,
  USERNAME,
} from "_m/startMainProcess.testHelpers";
import * as blockFixtures from "_tu/fixtures/blockFixtures";
import { renderAppWithStore } from "_tu/renderAppWithStore";
import { userEvent } from "_tu/smallUtils";
import {
  startMockErroringRpcServer,
  startMockRpcServer,
} from "_tu/startMockRpcServer";
import { pageElements as searchBoxPageElements } from "_r/App/AppBar/SearchBox/tests/SearchBox.testUtils";
import { pageElements } from "./RpcIssueDialog.testUtils";

jest.setTimeout(10000);

describe("RpcIssueDialog", () => {
  /**
   * WARNING: the test cases in this block depend on each other and must
   * run sequentially
   */

  beforeAll(async () => {
    // jest.spyOn(React, "useEffect").mockImplementation(React.useLayoutEffect);
    startMockRpcServer();
    initializeElectronCode();
    await renderAppWithStore();
    jest.useFakeTimers();
  });

  afterAll(() => {
    cleanup();
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
    startMockErroringRpcServer();

    fireEvent.change(await searchBoxPageElements.search(), {
      target: { value: blockFixtures.blockFixture3.hash },
    });

    fireEvent.keyUp(await searchBoxPageElements.search(), { keyCode: 13 });

    expect(await pageElements.rpcIssueDialogOpen()).toBeInTheDocument();
  });

  it("starts with the connection status report page", async () => {
    expect(await pageElements.connectionStatusReport()).toBeVisible();
  });

  it("tells the user when the credentials are not accepted by the RPC server", async () => {
    startMockErroringRpcServer({
      code: RPC_ERROR.unauthorized,
    });

    jest.advanceTimersByTime(2000);

    expect(await pageElements.unauthorizedMessage()).toBeVisible();
  });

  it("switches to server settings form when the user clicks on that button", async () => {
    fireEvent.click(await pageElements.enterServerDetails());

    expect(await pageElements.rpcSettingsInDialog()).toBeVisible();
  });

  it("checks the default RPC configurations", async () => {
    expect(await pageElements.useDefaultSettings()).toBeChecked();

    jest.spyOn(makeRpcRequestModule, "makeRpcRequest");

    jest.advanceTimersByTime(2000);

    await wait(() => {
      expect(makeRpcRequestModule.makeRpcRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: SERVER_URL,
          options: expect.objectContaining({
            auth: `${USERNAME}:${PASSWORD}`,
          }),
        }),
      );
    });
  });

  it("can turn off use of default settings", async () => {
    userEvent.click(await pageElements.useDefaultSettings());

    await wait(async () =>
      expect(await pageElements.useDefaultSettings()).not.toBeChecked(),
    );
  });

  it("shows a checkbox for using cookie authentication when use default settings is unchecked", async () => {
    expect(await await pageElements.useCookieAuthentication()).toBeChecked();
  });

  it("shows an empty text field for entering cookie file", async () => {
    expect(await pageElements.cookieFile()).toBeEmpty();
  });

  it("doesn't make RPC requests in this case", () => {
    // @ts-ignore
    makeRpcRequestModule.makeRpcRequest.mockClear();

    jest.advanceTimersByTime(2000);

    expect(makeRpcRequestModule.makeRpcRequest).not.toHaveBeenCalled();
  });

  it("supports specifying a cookie file path", async () => {
    vol.fromJSON({
      ...vol.toJSON(),
      "/home/.bitcoin/.cookiez": `__cookie__:1234`,
    });

    await userEvent.type(
      await pageElements.cookieFile(),
      "/home/.bitcoin/.cookiez",
    );

    expect(await pageElements.cookieFile()).toHaveValue(
      "/home/.bitcoin/.cookiez",
    );
  });

  it("starts checking with the RPC server when it has a valid cookie file with good credentials", async () => {
    // @ts-ignore
    makeRpcRequestModule.makeRpcRequest.mockClear();

    jest.advanceTimersByTime(2000);

    await wait(() => {
      expect(makeRpcRequestModule.makeRpcRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: SERVER_URL,
          options: expect.objectContaining({
            auth: `__cookie__:1234`,
          }),
        }),
      );
    });
  });

  it("stops checking with the RPC server when an invalid URL is given", async () => {
    userEvent.clear(await pageElements.serverUrl());
    await userEvent.type(await pageElements.serverUrl(), "http");

    // @ts-ignore
    makeRpcRequestModule.makeRpcRequest.mockClear();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await wait(() =>
      expect(makeRpcRequestModule.makeRpcRequest).not.toHaveBeenCalled(),
    );
  });

  it("supports saving the settings to the configurations file", async () => {
    userEvent.clear(await pageElements.serverUrl());
    await userEvent.type(await pageElements.serverUrl(), SERVER_URL);

    userEvent.click(await pageElements.rpcSettingsSaveButton());

    await wait(() => {
      expect(vol.toJSON()).toEqual(
        expect.objectContaining({
          "/platform-specific/app-path/Orange.json": JSON.stringify(
            {
              rpc: {
                cookieFile: "/home/.bitcoin/.cookiez",
                serverUrl: SERVER_URL,
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
      expect(await pageElements.connectionStatusReport()).toBeVisible();
    });
  });

  it("supports going back to the RPC settings page again", async () => {
    userEvent.click(await pageElements.enterServerDetails());

    expect(await pageElements.rpcSettingsInDialog()).toBeVisible();
  });

  it("supports entering a username and password manually", async () => {
    await wait(async () =>
      expect(await pageElements.useDefaultSettings()).not.toBeChecked(),
    );

    userEvent.click(await pageElements.useCookieAuthentication());

    await wait(async () => {
      expect(await pageElements.useCookieAuthentication()).not.toBeChecked();
    });

    expect(await pageElements.username()).toBeEmpty();
    expect(await pageElements.password()).toBeEmpty();
  });

  it("automatically checks the username and password", async () => {
    // @ts-ignore
    makeRpcRequestModule.makeRpcRequest.mockClear();

    await userEvent.type(await pageElements.username(), "hi");
    await userEvent.type(await pageElements.password(), "ho");

    jest.advanceTimersByTime(2000);

    await wait(() => {
      expect(makeRpcRequestModule.makeRpcRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: SERVER_URL,
          options: expect.objectContaining({
            auth: `hi:ho`,
          }),
        }),
      );
    });
  });

  it("supports saving the username and password", async () => {
    userEvent.click(await pageElements.rpcSettingsSaveButton());

    await wait(() => {
      expect(vol.toJSON()).toEqual(
        expect.objectContaining({
          "/platform-specific/app-path/Orange.json": JSON.stringify(
            {
              rpc: {
                username: "hi",
                password: "ho",
                serverUrl: SERVER_URL,
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
    userEvent.click(await pageElements.enterServerDetails());

    await wait(async () =>
      expect(await pageElements.username()).toHaveValue("hi"),
    );
  });

  it("supports reverting back to using the default settings", async () => {
    await wait(async () => {
      expect(await pageElements.useDefaultSettings()).not.toBeChecked();
    });

    userEvent.click(await pageElements.useDefaultSettings());
    userEvent.click(await pageElements.rpcSettingsSaveButton());

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
      await pageElements.connectionStatusReportCloseButton(),
    ).toBeDisabled();
  });

  it("enables the close button once a successful connection is made to the server", async () => {
    startMockRpcServer();

    jest.advanceTimersByTime(2000);

    await wait(async () => {
      expect(
        await pageElements.connectionStatusReportCloseButton(),
      ).toBeEnabled();
    });
  });

  it("let's the user close the RPC issue dialog when RPC is connected", async () => {
    userEvent.click(await pageElements.connectionStatusReportCloseButton());

    await wait(async () =>
      expect(await pageElements.rpcIssueDialogClosed()).toBeInTheDocument(),
    );
  });
});
