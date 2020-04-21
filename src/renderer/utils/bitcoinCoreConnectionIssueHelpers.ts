import { BITCOIN_CORE_RPC_ERROR, NODE_ERROR, RPC_ERROR } from "_c/constants";
import { RpcError } from "_t/RpcResponses";

export type BitcoinCoreConnectionIssue =
  | "cookieUnavailable"
  | "serverUnreachable"
  | "serverWarmingUp"
  | "unauthorized";

export const determineBitcoinCoreConnectionIssue = (rpcError: RpcError) => {
  const possibleErrors: [BitcoinCoreConnectionIssue, RpcError["code"]][] = [
    ["cookieUnavailable", RPC_ERROR.couldNotOpenCookieFile],
    ["serverUnreachable", NODE_ERROR.ECONNREFUSED],
    ["serverWarmingUp", BITCOIN_CORE_RPC_ERROR.warmingUp],
    ["unauthorized", RPC_ERROR.unauthorized],
  ];

  return (
    possibleErrors.find(([, errorCode]) => errorCode === rpcError.code)?.[0] ||
    null
  );
};

export const isBitcoinCoreConnectionIssue = (rpcError: RpcError) =>
  determineBitcoinCoreConnectionIssue(rpcError) !== null;