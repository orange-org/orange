import http from "http";
import { ERROR_CODES } from "_c/constants";
import { getRpcCredentials } from "_m/getRpcCredentials";
import { RpcRequest } from "_t/bitcoindRpcRequests";
import { RawRpcResponse, RpcError } from "_t/bitcoindRpcResponses";
import { ExtractedRpcResponse, PromiseType } from "_t/typeHelpers";
import { isRpcMethodAllowed } from "./isRpcMethodAllowed";

export const sendRpcRequestToBitcoind = async <TRpcRequest extends RpcRequest>(
  rpcRequest: TRpcRequest,
): Promise<ExtractedRpcResponse<TRpcRequest>> => {
  type ExtractedResponse = ExtractedRpcResponse<TRpcRequest>;

  let rpcCredentialsResponse: PromiseType<ReturnType<typeof getRpcCredentials>>;
  let rpcCredentialsError: any;

  try {
    rpcCredentialsResponse = await getRpcCredentials();
  } catch (error) {
    rpcCredentialsError = error;
  }

  return new Promise(resolve => {
    const { method, params = [], requestId } = rpcRequest;

    if (rpcCredentialsError) {
      resolve({
        method,
        requestId,
        result: null,
        error: rpcCredentialsError,
      } as ExtractedResponse);
      return;
    }

    const { username, password, port } = rpcCredentialsResponse;
    const url = `http://localhost:${port}`;

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
          } catch (_error) {
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
