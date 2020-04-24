import { ipcService } from "_r/ipc/ipcService";
import { isBitcoinCoreConnectionIssue } from "_r/utils/bitcoinCoreConnectionIssueHelpers";
import { RpcRequest } from "_t/RpcRequests";
import { RpcResponse } from "_t/RpcResponses";
import { fixingBitcoinCoreConnectionIssue } from "./fixingBitcoinCoreConnectionIssue";
import { rpcClientCache } from "./rpcClientCache";

export type RpcClientReturnType<T extends RpcRequest> = Extract<
  RpcResponse["result"],
  Extract<RpcResponse, { method: T["method"]; error: null }>["result"]
>;

export const rpcClient = async <TRpcRequest extends RpcRequest>(
  nonce: NONCE,
  rpcRequest: TRpcRequest,
  cacheTtl?: number,
): Promise<RpcClientReturnType<TRpcRequest>> => {
  if (cacheTtl) {
    const cacheResult = rpcClientCache.get(rpcRequest);

    if (cacheResult) {
      return cacheResult.result as RpcClientReturnType<TRpcRequest>;
    }
  }

  const response = await ipcService.rpcRequest(__NONCE__, rpcRequest);

  if (response.error) {
    if (isBitcoinCoreConnectionIssue(response.error)) {
      /**
       * If the reason we got an error is a fixable Bitcoin Core connection
       * issue, then we will try to fix it and re-try the call again.
       */
      await fixingBitcoinCoreConnectionIssue();

      return rpcClient(nonce, rpcRequest, cacheTtl);
    }

    throw response.error;
  }

  if (cacheTtl) {
    rpcClientCache.add(rpcRequest, response, cacheTtl);
  }

  return response.result as RpcClientReturnType<TRpcRequest>;
};
