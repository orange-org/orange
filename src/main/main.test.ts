import { vol } from "memfs";
import nock from "nock";
import { RPC_SERVER_URL } from "_c/constants";
import {
  app,
  BrowserWindow,
  resetStateOfElectronMock,
  WebContents,
} from "__mocks__/electron";
import { startMainProcess } from "./startMainProcess";
import { startPreloadProcess } from "./startPreloadProcess";

const initializeMainProcess = () => {
  app.emit("ready");
  app.emit("web-contents-created", new Event("type"), new WebContents());

  const { value: mainWindow } = BrowserWindow.instances.find(
    instance => instance.name === "Orange",
  )!;

  mainWindow.webContents.emit("did-finish-load");

  vol.fromJSON({
    "home/.bitcoin/bitcoin.conf": "",
    "home/.bitcoin/.cookie": "__cookie__:1337",
  });

  nock(RPC_SERVER_URL)
    .post("/")
    .reply(200, {});

  return mainWindow;
};

describe("main", () => {
  beforeEach(() => {
    startMainProcess();
    startPreloadProcess();
  });

  afterEach(() => {
    nock.cleanAll();
    resetStateOfElectronMock();
  });

  describe("general integration", () => {
    test("IPC RPC requests between main and renderer through preload", done => {
      const mainWindow = initializeMainProcess();

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

      mainWindow.webContents.once("message-to-renderer", event => {
        expect(event).toEqual({
          source: "@orange/main",
          nonce: __NONCE__,
          type: "rpc-response",
          message: {
            method: "getblock",
            requestId: 123,
          },
        });

        done();
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
