import { username, password } from "main/bitcoindCredentials";
import { RpcRequest, RpcResponse } from "typings/types";
import http from "http";

export const sendRpcRequestToBitcoind = (rpcRequest: RpcRequest) => {
  return new Promise<RpcResponse>((resolve, reject) => {
    const { method, params } = rpcRequest;
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
          console.log("data", data);
          return resolve(JSON.parse(data));
        });
        response.on("error", reject);
      },
    );

    request.on("error", reject);

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
