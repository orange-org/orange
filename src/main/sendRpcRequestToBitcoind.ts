import http from "http";
import { password, username } from "_m/bitcoindCredentials";
import { RpcRequest } from "_t/bitcoindRpcRequests";
import { RawRpcResponse } from "_t/bitcoindRpcResponses";
import { ExtractedRpcResponse } from "_t/typeHelpers";

export const sendRpcRequestToBitcoind = <TRpcRequest extends RpcRequest>(
  rpcRequest: TRpcRequest,
): Promise<ExtractedRpcResponse<TRpcRequest>> => {
  return new Promise((resolve, reject) => {
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
          try {
            const payload = JSON.parse(data) as RawRpcResponse;

            resolve({
              method,
              requestId,
              ...payload,
            } as ExtractedRpcResponse<TRpcRequest>);
          } catch (e) {
            console.error("RPC `end` response handler error", e);
            // throw new Error(e);
          }
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
