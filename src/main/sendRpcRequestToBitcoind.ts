import http from "http";
import { password, username } from "_m/bitcoindCredentials";
import { RpcRequest } from "_t/bitcoindRpcRequests";
import { RawRpcResponse } from "_t/bitcoindRpcResponses";
import { ExtractedRpcResponse } from "_t/typeHelpers";
import { ERROR_CODES } from "_c/constants";

export const sendRpcRequestToBitcoind = <TRpcRequest extends RpcRequest>(
  rpcRequest: TRpcRequest,
): Promise<ExtractedRpcResponse<TRpcRequest>> => {
  type ExtractedResponse = ExtractedRpcResponse<TRpcRequest>;

  return new Promise((resolve, reject) => {
    const { method, params = [], requestId } = rpcRequest;
    const url = "http://localhost:18332/";

    const request = http.request(
      url,
      {
        method: "POST",
        auth: `${username}:${password}`,
        headers: { "content-type": "text/plain" },
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

            resolve({ method, requestId, ...payload } as ExtractedResponse);
          } catch (error) {
            resolve({ method, requestId, error } as ExtractedResponse);
          }
        });
        response.on("error", error => reject(error));
      },
    );

    request.on("error", (error: any) => {
      if (error.code === ERROR_CODES.econnrefused) {
        resolve({ method, requestId, error } as ExtractedResponse);
      } else {
        reject(error);
      }
    });

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
