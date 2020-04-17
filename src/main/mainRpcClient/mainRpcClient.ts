import { ERROR_CODES } from "_c/constants";
import { getRpcCredentials } from "_m/getRpcCredentials";
import { RpcRequest } from "_t/bitcoindRpcRequests";
import { ExtractedRpcResponse } from "_t/typeHelpers";
import { RawRpcResponse } from "_t/bitcoindRpcResponses";
import { isRpcMethodAllowed } from "./isRpcMethodAllowed";
import { makeRpcRequest } from "./makeRpcRequest";

export const mainRpcClient = async <TRpcRequest extends RpcRequest>(
  rpcRequest: TRpcRequest,
): Promise<ExtractedRpcResponse<TRpcRequest>> => {
  const { method, params = [], requestId } = rpcRequest;

  if (!isRpcMethodAllowed(method)) {
    // eslint-disable-next-line no-throw-literal
    throw { code: ERROR_CODES.rpcMethodNotAllowed };
  }

  const { username, password, port } = await getRpcCredentials();
  const url = `http://localhost:${port}`;

  try {
    const response = await makeRpcRequest({
      url,
      options: {
        method: "POST",
        auth: `${username}:${password}`,
        headers: { "content-type": "text/plain" },
      },
      body: {
        jsonrpc: "1.0",
        id: "N/A",
        method,
        params,
      },
    });

    const { result, error }: RawRpcResponse = JSON.parse(response.data);

    return {
      result,
      error,
      method,
      requestId,
    } as ExtractedRpcResponse<TRpcRequest>;
  } catch (error) {
    return {
      error: {
        code: ERROR_CODES.rpcRequestError,
        message: "",
        payload: error,
      },
    } as ExtractedRpcResponse<TRpcRequest>;
  }
};
