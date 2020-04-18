import { UnsentRpcRequest } from "_t/RpcRequests";
import { RpcResponse } from "_t/RpcResponses";
import { isBitcoinCoreConnectionIssue } from "./isBitcoinCoreConnectionIssue";
import { makeRpcRequest } from "./makeRpcRequest";
import { rpcClientCache } from "./rpcClientCache";
import { fixingBitcoinCoreConnectionIssue } from "./fixingBitcoinCoreConnectionIssue";

export type RpcClientReturnType<T extends UnsentRpcRequest> = Extract<
  RpcResponse["result"],
  Extract<RpcResponse, { method: T["method"]; error: null }>["result"]
>;

export const rpcClient = async <TRpcRequest extends UnsentRpcRequest>(
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

  const response = await makeRpcRequest(nonce, rpcRequest);

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
