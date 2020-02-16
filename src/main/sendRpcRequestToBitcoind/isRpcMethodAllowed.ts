import { RpcRequest } from "_t/bitcoindRpcRequests";

export const isRpcMethodAllowed = (methodName: RpcRequest["method"]) => {
  const allowedMethods: RpcRequest["method"][] = [
    "getblockchaininfo",
    "getblock",
    "getblockhash",
  ];

  return allowedMethods.includes(methodName);
};
