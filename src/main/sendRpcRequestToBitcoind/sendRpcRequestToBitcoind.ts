import http from "http";
import { RPC_SERVER_URL, ERROR_CODES } from "_c/constants";
import { getRpcCredentials } from "_m/getRpcCredentials";
import { RpcRequest } from "_t/bitcoindRpcRequests";
import { RawRpcResponse, RpcError } from "_t/bitcoindRpcResponses";
import { ExtractedRpcResponse } from "_t/typeHelpers";
import { isRpcMethodAllowed } from "./isRpcMethodAllowed";

export const sendRpcRequestToBitcoind = async <TRpcRequest extends RpcRequest>(
  rpcRequest: TRpcRequest,
): Promise<ExtractedRpcResponse<TRpcRequest>> => {
  type ExtractedResponse = ExtractedRpcResponse<TRpcRequest>;

  const { username, password } = await getRpcCredentials();

  return new Promise(resolve => {
    const { method, params = [], requestId } = rpcRequest;
    const url = RPC_SERVER_URL;

    if (!isRpcMethodAllowed(method)) {
      resolve({
        method,
        requestId,
        result: null,
        error: { code: ERROR_CODES.rpcMethodNotAllowed },
      } as ExtractedResponse);
      return;
    }

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

            resolve({
              method,
              requestId,
              ...payload,
            } as ExtractedResponse);
          } catch (error_) {
            const error: RpcError = {
              code: ERROR_CODES.jsonParse,
              message: "",
            };

            resolve({ method, requestId, error } as ExtractedResponse);
          }
        });
      },
    );

    request.on("error", (error: any) => {
      resolve({
        method,
        requestId,
        error: {
          code: ERROR_CODES.rpcRequestError,
          message: "",
          payload: error,
        },
      } as ExtractedResponse);
    });

    request.write(
      JSON.stringify({
        jsonrpc: "1.0",
        id: "N/A",
        method,
        params,
      }),
    );

    request.end();
  });
};
