import { screen, wait } from "@testing-library/dom";
import { act, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import waitForExpect from "wait-for-expect";
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
import { vol } from "memfs";
import { delay } from "bluebird";

jest.setTimeout(99999999);

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

    expect(await screen.findByTestId("rpc-issue-dialog")).toBeVisible();
  });

  // it("starts with the connection status report page", async () => {
  //   expect(await screen.findByTestId("connection-status-report")).toBeVisible();
  // });

  // it("disables the close button on the dialog when not connected", async () => {
  //   expect(await screen.findByText("Close")).toBeDisabled();
  // });

  // it("automatically detects when the server becomes available and enables the close button", async () => {
  //   startMockRpcServer();
  //   jest.advanceTimersByTime(2000);

  //   await wait(async () =>
  //     expect(await screen.findByText("Close")).toBeEnabled(),
  //   );
  // });

  // it("tells the user when the credentials are not accepted by the RPC server", async () => {
  //   startMockErroringRpcServer({
  //     code: RPC_ERROR.unauthorized,
  //   });
  //   jest.advanceTimersByTime(2000);

  //   expect(await screen.findByTestId("unauthorized-message")).toBeVisible();
  // });

  it("switches to server settings form when the user clicks on that button", async () => {
    const enterServerDetailsButton = await screen.findByText(
      "Enter server details",
    );

    fireEvent.click(enterServerDetailsButton);

    expect(await screen.findByTestId("rpc-settings-in-dialog")).toBeVisible();
  });

  // it("checks the default RPC configurations", async () => {
  //   expect(await screen.findByTestId("useDefaultSettings")).toBeChecked();

  //   jest.spyOn(makeRpcRequestModule, "makeRpcRequest");

  //   jest.advanceTimersByTime(2000);

  //   await act(async () => {
  //     await waitForExpect(() => {
  //       expect(makeRpcRequestModule.makeRpcRequest).toHaveBeenCalledWith(
  //         expect.objectContaining({
  //           url: SERVER_URL,
  //           options: expect.objectContaining({
  //             auth: `${USERNAME}:${PASSWORD}`,
  //           }),
  //         }),
  //       );
  //     });
  //   });
  // });

  it("can turn off use of default settings", async () => {
    const useDefaultSettingsSwitch = await screen.findByTestId(
      "useDefaultSettings",
    );

    await act(async () => {
      await userEvent.click(useDefaultSettingsSwitch);
    });

    await wait(async () =>
      expect(await screen.findByTestId("useDefaultSettings")).not.toBeChecked(),
    );
  });

  // it("shows a checkbox for using cookie authentication when use default settings is unchecked", async () => {
  //   expect(await screen.findByTestId("useCookieAuthentication")).toBeChecked();
  // });

  // it("shows an empty text field for entering cookie file", async () => {
  //   expect(await screen.findByTestId("cookieFile")).toBeEmpty();
  // });

  // it("doesn't make RPC requests in this case", () => {
  //   // @ts-ignore
  //   makeRpcRequestModule.makeRpcRequest.mockClear();

  //   jest.advanceTimersByTime(2000);

  //   expect(makeRpcRequestModule.makeRpcRequest).not.toHaveBeenCalled();
  // });

  it("allows the user to type in a cookie file path", async () => {
    vol.fromJSON({
      ...vol.toJSON(),
      "/home/.bitcoin/.cookiez": `__cookie__:1234`,
    });

    const cookieFileTextField = await screen.findByTestId("cookieFile");

    await act(async () => {
      await userEvent.type(cookieFileTextField, "/home/.bitcoin/.cookiez");
    });

    expect(cookieFileTextField).toHaveValue("/home/.bitcoin/.cookiez");
  });

  it("starts checking with the RPC server when it has a valid cookie file with good credentials", async () => {
    jest.spyOn(makeRpcRequestModule, "makeRpcRequest"); // REMOVE

    // @ts-ignore
    makeRpcRequestModule.makeRpcRequest.mockClear();

    jest.advanceTimersByTime(2000);

    await act(async () => {
      await waitForExpect(() => {
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
  });

  it("can save the settings to the configurations file", async () => {
    const rpcSettingsSaveButton = await screen.getByTestId(
      "rpcSettingsSaveButton",
    );

    await act(async () => {
      await userEvent.click(rpcSettingsSaveButton);
    });

    await wait(() => {
      expect(true).toBe(false);
      // expect(vol.toJSON()).toEqual(
      //   expect.objectContaining({
      //     "/platform-specific/app-path/Orange.json": JSON.stringify(
      //       {
      //         rpc: {
      //           cookieFile: "/home/.bitcoin/.cookiez",
      //           serverUrl: SERVER_URL,
      //         },
      //       },
      //       null,
      //       2,
      //     ),
      //   }),
      // );
    });
  });
});
