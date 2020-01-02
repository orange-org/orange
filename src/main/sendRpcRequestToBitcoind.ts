/* eslint-disable prefer-destructuring */
import http from "http";
import { ipcMain, BrowserWindow } from "electron";

import { username, password } from "main/bitcoindCredentials";
import { RpcRequest } from "typings/bitcoindRpcRequests";
import { RpcResponse, RawRpcResponse } from "typings/bitcoindRpcResponses";
import { MessageToMain } from "typings/types";
import { sendMessageToRenderer } from "main/sendMessageToRenderer";

export const sendRpcRequestToBitcoind = (
  rpcRequest: RpcRequest,
): Promise<RpcResponse> => {
  return new Promise<RpcResponse>((resolve, reject) => {
    const { method, params = [], requestId } = rpcRequest;
    const url = "http://localhost:18332/";

    const request = http.request(
      url,
      {
        method: "POST",
        auth: `${username}:${password}`,
        headers: {
          "content-type": "text/plain",
        },
      },
      response => {
        response.setEncoding("utf8");

        let data = "";

        response.on("data", dataChunk => {
          data += dataChunk;
        });

        response.on("end", () => {
          const payload = JSON.parse(data) as RawRpcResponse;
          resolve({ method, payload, ok: true, requestId } as RpcResponse);
        });
        response.on("error", error => reject(error));
      },
    );

    request.on("error", error => reject(error));

    request.write(
      JSON.stringify({
        jsonrpc: "1.0",
        id: "static for now",
        method,
        params,
      }),
    );

    request.end();
  });
};

function isRpcRequestMessage(
  data: MessageToMain<any>,
): data is MessageToMain<RpcRequest> {
  return data.message.method !== undefined;
}

export const registerRpcRequestListener = (mainWindow: BrowserWindow) => {
  ipcMain.on("message-to-main", async (_event, data: MessageToMain<any>) => {
    if (isRpcRequestMessage(data)) {
      try {
        const response = await sendRpcRequestToBitcoind(data.message);

        sendMessageToRenderer<RpcResponse>(
          {
            nonce: __NONCE__,
            type: "rpc-response",
            message: response,
          },
          mainWindow,
        );
      } catch (error) {
        throw new Error(`Error with \`sendRpcRequestToBitcoind\`: ${error}`);
      }
    }
  });
};
