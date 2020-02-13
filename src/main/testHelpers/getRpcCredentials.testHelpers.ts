import nock from "nock";
import { RPC_SERVER_URL } from "_c/constants";
import { BrowserWindow, ipcMain } from "__mocks__/electron";
import { merge } from "lodash";

export const setupProcessVariables = (
  processVariables: {
    platform: string;
    env: {
      APPDATA?: string;
      HOME?: string;
    };
  },
  getGlobalProcess: jest.Mock,
) => {
  getGlobalProcess.mockImplementation(() =>
    merge({ ...process }, processVariables),
  );
};

export const setupMockHttpAuthHeader = (cookieValue: string) => {
  return nock(RPC_SERVER_URL, {
    reqheaders: {
      authorization: `Basic ${Buffer.from(cookieValue).toString("base64")}`,
    },
  })
    .post("/")
    .reply(200);
};

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
