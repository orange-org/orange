/* eslint-disable prefer-destructuring */
import { username, password } from "main/bitcoindCredentials";
import http from "http";
import { RpcRequest } from "typings/bitcoindRpcRequests";
import { RpcResponse, RawRpcResponse } from "typings/bitcoindRpcResponses";

export const sendRpcRequestToBitcoind = (
  rpcRequest: RpcRequest,
): Promise<RpcResponse> => {
  return new Promise<RpcResponse>((resolve, reject) => {
    const { method, params = [] } = rpcRequest;
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
        response.on("data", data => {
          const payload = JSON.parse(data) as RawRpcResponse;

          resolve({ method, payload });
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
