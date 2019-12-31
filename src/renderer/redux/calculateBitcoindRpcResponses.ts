import { State } from "renderer/redux/reducers";
import { RpcResponse } from "typings/bitcoindRpcResponses";

export function calculateBitcoindRpcResponses(
  bitcoindRpcResponses: State["bitcoindRpcResponses"],
  rpcResponse: RpcResponse,
) {
  if (rpcResponse.method === "getnetworkinfo") {
    return { ...bitcoindRpcResponses, networkInfo: rpcResponse.payload.result };
  }

  return bitcoindRpcResponses;
}
