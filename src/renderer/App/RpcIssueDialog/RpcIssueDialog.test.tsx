import { screen, wait } from "@testing-library/dom";
import { cleanup, fireEvent } from "@testing-library/react";
import { RPC_ERROR } from "_c/constants";
import { initializeElectronCode } from "_m/startMainProcess.testHelpers";
import * as blockFixtures from "_tu/fixtures/blockFixtures";
import { renderAppWithStore } from "_tu/renderAppWithStore";
import {
  startMockErroringRpcServer,
  startMockRpcServer,
} from "_tu/startMockRpcServer";
import * as makeRpcRequestModule from "_m/mainRpcClient/makeRpcRequest";

describe("RpcIssueDialog", () => {
  /**
   * WARNING: the test cases in this block depend on each other and must
   * run sequentially
   */

  beforeAll(async () => {
    startMockRpcServer();
    initializeElectronCode(false);
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

  it("starts with the connection status report page", async () => {
    expect(await screen.findByTestId("connection-status-report")).toBeVisible();
  });

  it("disables the close button on the dialog when not connected", async () => {
    expect(await screen.findByText("Close")).toBeDisabled();
  });

  it("automatically detects when the server becomes available and enables the close button", async () => {
    startMockRpcServer();
    jest.advanceTimersByTime(1000);

    await wait(async () =>
      expect(await screen.findByText("Close")).toBeEnabled(),
    );
  });

  it("tells the user when the credentials are not accepted by the RPC server", async () => {
    startMockErroringRpcServer({
      code: RPC_ERROR.unauthorized,
    });
    jest.advanceTimersByTime(1000);

    expect(await screen.findByTestId("unauthorized-message")).toBeVisible();
  });

  it("switches to server settings form when the user clicks on that button", async () => {
    const enterServerDetailsButton = await screen.findByText(
      "Enter server details",
    );

    fireEvent.click(enterServerDetailsButton);

    expect(await screen.findByTestId("rpc-settings-in-dialog")).toBeVisible();
  });

  // it("checks the default RPC configurations", async () => {
  //   expect(await screen)
  // });
});
