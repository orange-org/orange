import { RpcError } from "_t/bitcoindRpcResponses";
import { ERROR_CODES, RPC_SERVER_ERROR_CODES } from "_c/constants";

export const isBitcoinCoreConnectionIssue = (rpcError: RpcError) => {
  console.log("rpcError", rpcError);
  return (
    rpcError.code === ERROR_CODES.couldNotOpenCookieFile ||
    rpcError.code === ERROR_CODES.couldNotOpenBitcoinConf ||
    rpcError.code === RPC_SERVER_ERROR_CODES.warmingUp ||
    rpcError.code === ERROR_CODES.rpcRequestError
  );
};
