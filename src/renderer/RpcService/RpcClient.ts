import { ipcService } from "_r/IpcService/IpcService";
import { RpcRequest } from "_t/RpcRequests";
import { RpcResponse } from "_t/RpcResponses";
import { RpcIssue } from "./RpcIssue";
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

    const response = await ipcService.rpcRequest(__NONCE__, rpcRequest);

    if (response.error) {
      if (RpcIssue.isRpcIssue(response.error)) {
        /**
         * If the reason we got an error is a fixable Bitcoin Core connection
         * issue, then we will try to fix it and re-try the call again.
         */
        await RpcIssue.checkIfIssueHasBeenFixed();

        return RpcClient.send(nonce, rpcRequest, cacheDuration);
      }

      throw response.error;
    }

    if (cacheDuration) {
      rpcClientCache.add(rpcRequest, response, cacheDuration);
    }

    return response.result as RpcClientReturnType<TRpcRequest>;
  };
}
