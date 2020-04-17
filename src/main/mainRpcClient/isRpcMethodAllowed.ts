import { RpcRequest } from "_t/RpcRequests";

export const isRpcMethodAllowed = (methodName: RpcRequest["method"]) => {
  const allowedMethods: RpcRequest["method"][] = [
    "getblockchaininfo",
    "getblock",
    "getblockhash",
    "getrawtransaction",
  ];

  return allowedMethods.includes(methodName);
};
