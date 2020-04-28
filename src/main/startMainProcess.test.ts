import { merge } from "lodash";
import waitForExpect from "wait-for-expect";
import { getGlobalProcess as getGlobalProcess_ } from "_m/getGlobalProcess";
import { app, BrowserWindow, dialog, WebContents } from "__mocks__/electron";
import { initializeElectronCode } from "./startMainProcess.testHelpers";

const getGlobalProcess = getGlobalProcess_ as jest.Mock;
const currentGlobalProcess = getGlobalProcess_();

getGlobalProcess.mockImplementation(() =>
  merge(currentGlobalProcess, { argv: ["--datadir=some/data/dir/"] }),
);

describe("main", () => {
  let mainWindow: BrowserWindow;

  beforeAll(() => {
    mainWindow = initializeElectronCode();
  });

  describe("general integration", () => {
    test("IPC RPC requests between main and renderer through preload", done => {
      window.postMessage(
        {
          nonce: __NONCE__,
          type: "rpc-request",
          source: "@orange/renderer",
          messageId: 123,
          payload: {
            method: "getblock",
          },
        },
        "*",
      );

      const eventListener = (event: MessageEvent) => {
        const { data } = event;

        if (data && data.source === "@orange/main") {
          expect(data).toEqual({
            source: "@orange/main",
            nonce: __NONCE__,
            type: "rpc-request",
            messageId: 123,
            payload: {
              method: "getblock",
            },
          });

          window.removeEventListener("message", eventListener);
          done();
        }
      };
      window.addEventListener("message", eventListener);
    });

    test('"show-error" IPC event', () => {
      window.postMessage(
        {
          nonce: __NONCE__,
          type: "show-error",
          source: "@orange/renderer",
          payload: "stuff",
        },
        "*",
      );

      return waitForExpect(() => {
        expect(dialog.showMessageBoxSync).toHaveBeenCalledTimes(1);
        expect(dialog.showMessageBoxSync).toHaveBeenCalledWith({
          message:
            "This dialog is for reporting unexpected errors only. Do not follow any instructions that appear in it. The reported error is below.\n\nstuff",
          title: "An error occurred",
          type: "warning",
        });

        dialog.showMessageBoxSync.mockReset();
      });
    });

    test("catching generic errors", () => {
      jest.spyOn(console, "log").mockImplementation(jest.fn);

      // @ts-ignore
      process.emit("unhandledRejection", "hello");
      // @ts-ignore
      process.emit("unhandledRejection", new Error("happened"));

      jest.spyOn(console, "log").mockRestore();

      return waitForExpect(() => {
        expect(dialog.showMessageBoxSync).toHaveBeenCalledTimes(2);

        expect(dialog.showMessageBoxSync).toHaveBeenNthCalledWith(1, {
          message:
            'This dialog is for reporting unexpected errors only. Do not follow any instructions that appear in it. The reported error is below.\n\n"hello"',
          title: "An error occurred",
          type: "warning",
        });

        expect(dialog.showMessageBoxSync).toHaveBeenNthCalledWith(2, {
          message:
            "This dialog is for reporting unexpected errors only. Do not follow any instructions that appear in it. The reported error is below.\n\nError: happened",
          title: "An error occurred",
          type: "warning",
        });

        dialog.showMessageBoxSync.mockReset();
      });
    });

    test("wiring of mainWindow.webContents.session.webRequest.onBeforeRequest", () => {
      const spy = jest.fn();

      mainWindow.webContents.session.webRequest.emit(
        "before-request",
        { url: "http://somepath.com" },
        spy,
      );

      expect(spy).toHaveBeenCalledWith({ cancel: true });
    });

    test('wiring of app.on("web-contents-created")', () => {
      const webContents = new WebContents();

      app.emit("web-contents-created", null, webContents);

      const spy1 = { preventDefault: jest.fn() };
      webContents.emit("will-attach-webview", spy1);
      expect(spy1.preventDefault).toHaveBeenCalled();

      const spy2 = { preventDefault: jest.fn() };
      webContents.emit("new-window", spy2);
      expect(spy2.preventDefault).toHaveBeenCalled();
    });
  });
});
