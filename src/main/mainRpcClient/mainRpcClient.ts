/* eslint-disable no-throw-literal */
import { BITCOIN_CORE_RPC_ERROR, NODE_ERROR, RPC_ERROR } from "_c/constants";
import { RpcRequest } from "_t/RpcRequests";
import { RawRpcResponse } from "_t/RpcResponses";
import { ExtractedRpcResponse } from "_t/typeHelpers";
import { isRpcMethodAllowed } from "./isRpcMethodAllowed";
import { makeRpcRequest } from "./makeRpcRequest";

export type RpcConfigurations = {
  username: string;
  password: string;
  serverUrl: string;
};

export const mainRpcClient = async <TRpcRequest extends RpcRequest>(
  rpcRequest: TRpcRequest,
  rpcConfigurations: RpcConfigurations,
): Promise<ExtractedRpcResponse<TRpcRequest>> => {
  const { method, params = [], requestId } = rpcRequest;
  const { username, password, serverUrl } = rpcConfigurations;

  try {
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

    return { result, error, method, requestId } as ExtractedRpcResponse<
      TRpcRequest
    >;
  } catch (error) {
    const response = {
      result: null,
      error: { message: "", code: 0 },
      method,
      requestId,
    };
    const errorDefinitions = [
      {
        condition:
          error.code === RPC_ERROR.couldNotOpenBitcoinConf ||
          error.code === RPC_ERROR.couldNotOpenCookieFile,
      },

      {
        message: "Server is unreachable",
        condition: error.code === NODE_ERROR.ECONNREFUSED,
      },

      {
        message: "Server is warming up",
        condition: error.code === BITCOIN_CORE_RPC_ERROR.warmingUp,
      },

      {
        condition: error.code === RPC_ERROR.unauthorized,
      },
    ];

    // eslint-disable-next-line no-restricted-syntax
    for (const errorDefinition of errorDefinitions) {
      if (errorDefinition.condition) {
        response.error.code = error.code;
        response.error.message = errorDefinition.message || error.message;

        return response as ExtractedRpcResponse<TRpcRequest>;
      }
    }

    throw error;
  }
};
