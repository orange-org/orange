import { BITCOIN_CORE_RPC_ERROR, NODE_ERROR, RPC_ERROR } from "_c/constants";
import { RpcError } from "_t/RpcResponses";

export type RpcIssue =
  | "cookieUnavailable"
  | "serverUnreachable"
  | "serverWarmingUp"
  | "unauthorized";

export const determineRpcIssue = (rpcError: RpcError) => {
  const possibleErrors: [RpcIssue, RpcError["code"]][] = [
    ["cookieUnavailable", RPC_ERROR.couldNotOpenCookieFile],
    ["serverUnreachable", NODE_ERROR.ECONNREFUSED],
    ["serverUnreachable", NODE_ERROR.ENOTFOUND],
    ["serverWarmingUp", BITCOIN_CORE_RPC_ERROR.warmingUp],
    ["unauthorized", RPC_ERROR.unauthorized],
  ];

  return (
    possibleErrors.find(([, errorCode]) => errorCode === rpcError.code)?.[0] ||
    null
  );
};

export const isRpcIssue = (rpcError: RpcError) =>
  determineRpcIssue(rpcError) !== null;
