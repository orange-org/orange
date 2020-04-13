import { vol } from "memfs";
import nock from "nock";
import {
  app,
  BrowserWindow,
  resetStateOfElectronMock,
  WebContents,
  dialog,
} from "__mocks__/electron";
import { getGlobalProcess as getGlobalProcess_ } from "_m/getGlobalProcess";
import { merge } from "lodash";
import waitForExpect from "wait-for-expect";
import { startMainProcess } from "./startMainProcess";
import { startPreloadProcess } from "./startPreloadProcess";

const getGlobalProcess = getGlobalProcess_ as jest.Mock;
const currentGlobalProcess = getGlobalProcess_();

getGlobalProcess.mockImplementation(() =>
  merge(currentGlobalProcess, { argv: ["--datadir=some/data/dir/"] }),
);

const initializeMainProcess = () => {
  app.emit("ready");

  const { value: mainWindow } = BrowserWindow.instances.find(
    instance => instance.name === "Orange",
  )!;

  mainWindow.webContents.emit("did-finish-load");

  vol.fromJSON({
    "home/.bitcoin/bitcoin.conf": "",
    "home/.bitcoin/.cookie": "__cookie__:1337",
  });

  nock("http://localhost:8332")
    .post("/")
    .reply(200, {});

  return mainWindow;
};

let cleanPreloadProcess: () => any;

describe("main", () => {
  beforeEach(() => {
    startMainProcess();
    cleanPreloadProcess = startPreloadProcess();
  });

  afterEach(() => {
    nock.cleanAll();
    resetStateOfElectronMock();
    cleanPreloadProcess();
  });

  describe("general integration", () => {
    test("IPC RPC requests between main and renderer through preload", done => {
      initializeMainProcess();

      window.postMessage(
        {
          nonce: __NONCE__,
          type: "rpc-request",
          source: "@orange/renderer",
          message: {
            method: "getblock",
            requestId: 123,
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
            type: "rpc-response",
            message: {
              method: "getblock",
              requestId: 123,
            },
          });

          window.removeEventListener("message", eventListener);
          done();
        }
      };
      window.addEventListener("message", eventListener);
    });

    test('"show-error" IPC event', () => {
      initializeMainProcess();

      window.postMessage(
        {
          nonce: __NONCE__,
          type: "show-error",
          source: "@orange/renderer",
          message: "stuff",
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
      });
    });

    test("wiring of mainWindow.webContents.session.webRequest.onBeforeRequest", () => {
      const mainWindow = initializeMainProcess();
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
