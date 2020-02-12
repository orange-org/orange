import nock from "nock";
import { RPC_SERVER_URL } from "_c/constants";
import { BrowserWindow, ipcMain } from "__mocks__/electron";

export const setupMockHttpAuthHeader = (cookieValue: string) =>
  nock(RPC_SERVER_URL, {
    reqheaders: {
      authorization: `Basic ${Buffer.from(cookieValue).toString("base64")}`,
    },
  })
    .post("/")
    .reply(200);

export const expectSuccessfulResponse = (
  scope: nock.Scope,
  done: jest.DoneCallback,
  mainWindow: BrowserWindow,
) => {
  mainWindow.webContents.once("message-to-renderer", () => {
    expect(() => scope.done()).not.toThrow();
    done();
  });
};

export const sendAnyRequest = () => {
  ipcMain.emit("message-to-main", null, {
    type: "rpc-request",
    message: { method: "getblock", requestId: 123 },
  });
};
