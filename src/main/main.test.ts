import { merge } from "lodash";
import waitForExpect from "wait-for-expect";
import { Utils } from "_m/common/Utils";
import { app, BrowserWindow, dialog, WebContents } from "__mocks__/electron";
import { MockElectron } from "_tu/MockElectron";

// @ts-ignore
Utils.getGlobalProcess.mockImplementation(() =>
  merge(Utils.getGlobalProcess(), { argv: ["--datadir=some/data/dir/"] }),
);

describe("main", () => {
  let mainWindow: BrowserWindow;

  beforeAll(() => {
    mainWindow = MockElectron.start();
  });

  describe("general integration", () => {
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
        expect(dialog.showMessageBox).toHaveBeenCalledTimes(1);
        expect(dialog.showMessageBox).toHaveBeenCalledWith({
          message:
            "This dialog is for reporting unexpected errors only. Do not follow any instructions that appear in it. The reported error is below.\n\nstuff",
          title: "An error occurred",
          type: "warning",
        });

        dialog.showMessageBox.mockReset();
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
        expect(dialog.showMessageBox).toHaveBeenCalledTimes(2);

        expect(dialog.showMessageBox).toHaveBeenNthCalledWith(1, {
          message:
            'This dialog is for reporting unexpected errors only. Do not follow any instructions that appear in it. The reported error is below.\n\n"hello"',
          title: "An error occurred",
          type: "warning",
        });

        expect(dialog.showMessageBox).toHaveBeenNthCalledWith(2, {
          message:
            "This dialog is for reporting unexpected errors only. Do not follow any instructions that appear in it. The reported error is below.\n\nError: happened",
          title: "An error occurred",
          type: "warning",
        });

        dialog.showMessageBox.mockReset();
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
