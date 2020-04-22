import { RpcRequest } from "_t/RpcRequests";
import { RpcResponse } from "_t/RpcResponses";
import { isBitcoinCoreConnectionIssue } from "_r/utils/bitcoinCoreConnectionIssueHelpers";
import { callMain } from "_r/ipc/callMain";
import { rpcClientCache } from "./rpcClientCache";
import { fixingBitcoinCoreConnectionIssue } from "./fixingBitcoinCoreConnectionIssue";

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

  console.log("=\nFILE: rpcClient.ts\nLINE: 27\n=");
  const { message: response } = await callMain({
    nonce,
    type: "rpc-request",
    message: rpcRequest,
  });

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
