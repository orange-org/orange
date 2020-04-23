/* eslint-disable no-throw-literal */
import { RPC_ERROR } from "_c/constants";
import { RpcRequest } from "_t/RpcRequests";
import { RawRpcResponse } from "_t/RpcResponses";
import { ExtractedRpcResponse } from "_t/typeHelpers";
import { isRpcMethodAllowed } from "./isRpcMethodAllowed";
import { makeRpcRequest } from "./makeRpcRequest";

export const mainRpcClient = async <TRpcRequest extends RpcRequest>(
  rpcRequest: TRpcRequest,
  rpcConfigurations: { username: string; password: string; serverUrl: string },
): Promise<ExtractedRpcResponse<TRpcRequest>> => {
  const { method, params = [] } = rpcRequest;
  const { username, password, serverUrl } = rpcConfigurations;

  if (!isRpcMethodAllowed(method)) {
    throw {
      code: RPC_ERROR.methodNotAllowedByMainProcess,
      message: "RPC method not allowed by main process",
    };
  }

  const options = {
    method: "POST",
    auth: `${username}:${password}`,
    headers: { "content-type": "text/plain" },
  };
  const body = { jsonrpc: "1.0", id: "N/A", method, params };

  const response = await makeRpcRequest({ url: serverUrl, options, body });

  if (response.statusCode === 401 || response.statusCode === 403) {
    throw {
      code: RPC_ERROR.unauthorized,
      message: "RPC server unauthorized request",
    };
  }

  const { result, error }: RawRpcResponse = JSON.parse(response.data);

  return { result, error, method } as ExtractedRpcResponse<TRpcRequest>;
};
