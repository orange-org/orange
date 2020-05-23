import { RPC_ERROR } from "_c/constants";
import { RpcRequest } from "_t/RpcRequests";
import { RawRpcResponse } from "_t/RpcResponses";
import { ExtractedRpcResponse } from "_t/typeHelpers";
import { ErrorWithCode } from "_c/ErrorWithCode";
import { makeRpcRequest } from "./makeRpcRequest";

export const mainRpcClient = async <TRpcRequest extends RpcRequest>(
  rpcRequest: TRpcRequest,
  rpcConfigurations: { username: string; password: string; serverUrl: string },
): Promise<ExtractedRpcResponse<TRpcRequest>> => {
  const { method, params = [], walletName } = rpcRequest;
  const { username, password, serverUrl } = rpcConfigurations;
  const options = {
    method: "POST",
    auth: `${username}:${password}`,
    headers: { "content-type": "text/plain" },
  };
  const body = { jsonrpc: "1.0", id: "N/A", method, params };

  const response = await makeRpcRequest({
    url: `${serverUrl}${
      walletName ? `/${encodeURIComponent(walletName)}` : ""
    }`,
    options,
    body,
  });

  if (response.statusCode === 401 || response.statusCode === 403) {
    throw new ErrorWithCode(
      "RPC server unauthorized request",
      RPC_ERROR.unauthorized,
    );
  }

  const { result, error }: RawRpcResponse =
    response.data.length > 0
      ? JSON.parse(response.data)
      : { result: "", error: null };

  return { result, error, method } as ExtractedRpcResponse<TRpcRequest>;
};
