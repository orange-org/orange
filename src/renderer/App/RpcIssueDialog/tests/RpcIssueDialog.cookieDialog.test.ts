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
import { dialog } from "__mocks__/electron";
import { pageElements } from "./RpcIssueDialog.testUtils";

jest.setTimeout(10000);

describe("RpcIssueDialog", () => {
  describe("Cookie dialog", () => {
    beforeAll(async () => {
      startMockRpcServer();
      initializeElectronCode();
      await renderAppWithStore();
      jest.useFakeTimers();
    });

    test("bringing up the RPC issue dialog", async () => {
      startMockErroringRpcServer();

      fireEvent.change(await searchBoxPageElements.search(), {
        target: { value: blockFixtures.blockFixture3.hash },
      });

      fireEvent.keyUp(await searchBoxPageElements.search(), { keyCode: 13 });

      expect(await pageElements.rpcIssueDialog()).toBeInTheDocument();
    });

    test("then navigating to the server settings page", async () => {
      fireEvent.click(await pageElements.enterServerDetails());

      expect(await pageElements.rpcSettingsInDialog()).toBeVisible();
    });

    test("then tuning off using default settings", async () => {
      userEvent.click(await pageElements.useDefaultSettings());

      await wait(async () =>
        expect(await pageElements.useDefaultSettings()).not.toBeChecked(),
      );
    });

    test("then selecting a cookie from the open file dialog", async () => {
      dialog.showOpenDialog.mockReturnValueOnce({
        filePaths: ["/cookie-location/.cookie"],
      });

      userEvent.click(await pageElements.setCookieFileFromDialog());

      jest.advanceTimersByTime(2000);

      await wait(async () => {
        expect(await pageElements.cookieFile()).toHaveValue(
          "/cookie-location/.cookie",
        );
      });
    });

    test("then another time opening the file dialog but not selecting anything", async () => {
      dialog.showOpenDialog.mockReturnValueOnce({ filePaths: null });

      userEvent.click(await pageElements.setCookieFileFromDialog());

      jest.advanceTimersByTime(2000);

      await wait(async () => {
        expect(await pageElements.cookieFile()).toHaveValue(
          "/cookie-location/.cookie",
        );
      });
    });
  });
});
