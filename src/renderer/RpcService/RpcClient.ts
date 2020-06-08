import { ipcService } from "_r/IpcService/IpcService";
import { RpcRequest } from "_t/RpcRequests";
import { RpcResponse } from "_t/RpcResponses";
import { rpcClientCache } from "./RpcClientCache";

export type RpcClientReturnType<T extends RpcRequest> = Extract<
  RpcResponse["result"],
  Extract<RpcResponse, { method: T["method"]; error: null }>["result"]
>;

export class RpcClient {
  static send = async <TRpcRequest extends RpcRequest>(
    nonce: NONCE,
    rpcRequest: TRpcRequest,
    cacheDuration?: number,
  ): Promise<RpcClientReturnType<TRpcRequest>> => {
    if (cacheDuration) {
      const cacheResult = rpcClientCache.get(rpcRequest);

      if (cacheResult) {
        return cacheResult.result as RpcClientReturnType<TRpcRequest>;
      }
    }

    const response = await ipcService.rpcRequest(nonce, rpcRequest);

    if (response.error) {
      throw response.error;
    }

    if (cacheDuration) {
      rpcClientCache.add(rpcRequest, response, cacheDuration);
    }

    return response.result as RpcClientReturnType<TRpcRequest>;
  };
}
