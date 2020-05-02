import { screen, wait, waitForElementToBeRemoved } from "@testing-library/dom";
import { act, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
import {
  startMockErroringRpcServer,
  startMockRpcServer,
} from "_tu/startMockRpcServer";
import { printElement } from "_tu/smallUtils";

jest.setTimeout(10000);

describe("RpcIssueDialog", () => {
  /**
   * WARNING: the test cases in this block depend on each other and must
   * run sequentially
   */

  beforeAll(async () => {
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

    const searchBox = await screen.findByLabelText("search");

    fireEvent.change(searchBox, {
      target: { value: blockFixtures.blockFixture3.hash },
    });

    fireEvent.keyUp(searchBox, { keyCode: 13 });

    expect(
      await screen.findByTestId("rpcIssueDialog-open"),
    ).toBeInTheDocument();
  });

  it("starts with the connection status report page", async () => {
    expect(await screen.findByTestId("connectionStatusReport")).toBeVisible();
  });

  it("tells the user when the credentials are not accepted by the RPC server", async () => {
    startMockErroringRpcServer({
      code: RPC_ERROR.unauthorized,
    });
    jest.advanceTimersByTime(2000);

    expect(await screen.findByTestId("unauthorized-message")).toBeVisible();
  });

  it("switches to server settings form when the user clicks on that button", async () => {
    const enterServerDetailsButton = await screen.findByText(
      "Enter server details",
    );

    fireEvent.click(enterServerDetailsButton);

    expect(await screen.findByTestId("rpcSettingsInDialog")).toBeVisible();
  });

  it("checks the default RPC configurations", async () => {
    expect(await screen.findByTestId("useDefaultSettings")).toBeChecked();

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
    const useDefaultSettingsSwitch = await screen.findByTestId(
      "useDefaultSettings",
    );

    act(() => userEvent.click(useDefaultSettingsSwitch));

    await wait(async () =>
      expect(await screen.findByTestId("useDefaultSettings")).not.toBeChecked(),
    );
  });

  it("shows a checkbox for using cookie authentication when use default settings is unchecked", async () => {
    expect(await screen.findByTestId("useCookieAuthentication")).toBeChecked();
  });

  it("shows an empty text field for entering cookie file", async () => {
    expect(await screen.findByTestId("cookieFile")).toBeEmpty();
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

    const cookieFileTextField = await screen.findByTestId("cookieFile");

    await act(() =>
      userEvent.type(cookieFileTextField, "/home/.bitcoin/.cookiez"),
    );

    expect(cookieFileTextField).toHaveValue("/home/.bitcoin/.cookiez");
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

  it("supports saving the settings to the configurations file", async () => {
    const rpcSettingsSaveButton = await screen.getByTestId(
      "rpcSettingsSaveButton",
    );

    act(() => userEvent.click(rpcSettingsSaveButton));

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
      expect(await screen.getByTestId("connectionStatusReport")).toBeVisible();
    });
  });

  it("supports going back to the RPC settings page again", async () => {
    const enterServerDetailsButton = await screen.findByText(
      "Enter server details",
    );

    act(() => userEvent.click(enterServerDetailsButton));

    expect(await screen.findByTestId("rpcSettingsInDialog")).toBeVisible();
  });

  it("supports entering a username and password manually", async () => {
    jest.advanceTimersByTime(2000);

    await wait(async () =>
      expect(await screen.findByTestId("useDefaultSettings")).not.toBeChecked(),
    );

    const useCookieAuthenticationSwitch = await screen.findByTestId(
      "useCookieAuthentication",
    );

    act(() => userEvent.click(useCookieAuthenticationSwitch));

    await wait(() => {
      expect(useCookieAuthenticationSwitch).not.toBeChecked();
    });

    expect(await screen.getByTestId("username")).toBeEmpty();
    expect(await screen.getByTestId("password")).toBeEmpty();
  });

  it("automatically checks the username and password", async () => {
    // @ts-ignore
    makeRpcRequestModule.makeRpcRequest.mockClear();

    const usernameTextField = await screen.getByTestId("username");
    const passwordTextField = await screen.getByTestId("password");

    await act(async () => {
      await userEvent.type(usernameTextField, "hi");
      await userEvent.type(passwordTextField, "ho");
    });

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
    const rpcSettingsSaveButton = await screen.getByTestId(
      "rpcSettingsSaveButton",
    );

    act(() => userEvent.click(rpcSettingsSaveButton));

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

  it("supports reverting back to using the default settings", async () => {
    const enterServerDetailsButton = await screen.findByText(
      "Enter server details",
    );

    fireEvent.click(enterServerDetailsButton);

    const useDefaultSettingsSwitch = await screen.findByTestId(
      "useDefaultSettings",
    );

    jest.advanceTimersByTime(2000);

    await wait(async () => {
      expect(useDefaultSettingsSwitch).not.toBeChecked();
    });

    await act(async () => {
      userEvent.click(useDefaultSettingsSwitch);
      userEvent.click(await screen.getByTestId("rpcSettingsSaveButton"));
    });

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
      await screen.findByTestId("connectionStatusReport-closeButton"),
    ).toBeDisabled();
  });

  it("enables the close button once a successful connection is made to the server", async () => {
    startMockRpcServer();

    jest.advanceTimersByTime(2000);

    await wait(async () => {
      expect(
        await screen.findByTestId("connectionStatusReport-closeButton"),
      ).toBeEnabled();
    });
  });

  it("let's the user close the RPC issue dialog when RPC is connected", async () => {
    await act(async () =>
      userEvent.click(
        await screen.findByTestId("connectionStatusReport-closeButton"),
      ),
    );

    await wait(async () =>
      expect(
        await screen.findByTestId("rpcIssueDialog-closed"),
      ).toBeInTheDocument(),
    );
  });
});
