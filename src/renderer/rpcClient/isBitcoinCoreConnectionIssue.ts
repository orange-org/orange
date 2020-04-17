import { BITCOIN_CORE_RPC_ERROR, NODE_ERROR, RPC_ERROR } from "_c/constants";
import { RpcError } from "_t/RpcResponses";

export const isBitcoinCoreConnectionIssue = (rpcError: RpcError) => {
  console.log("rpcError", rpcError);
  return (
    rpcError.code === RPC_ERROR.couldNotOpenCookieFile ||
    rpcError.code === RPC_ERROR.couldNotOpenBitcoinConf ||
    rpcError.code === BITCOIN_CORE_RPC_ERROR.warmingUp ||
    rpcError.code === NODE_ERROR.ECONNREFUSED
  );
};
