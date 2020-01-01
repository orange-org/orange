import { createAction } from "typesafe-actions";

import { RpcResponse } from "typings/bitcoindRpcResponses";
import { Json } from "typings/types";
import { rpcClient } from "./rpcClient";

export const setSystemPreference = createAction("SET_SYSTEM_PREFERENCE")<
  Json
>();

export const receiveBitcoindLine = createAction("RECEIVE_BITCOIND_LINE")<
  string
>();

export const receiveBitcoindRpcResponse = createAction(
  "RECEIVE_BITCOIND_RPC_RESPONSE",
)<RpcResponse>();

// export const getBestBlockHash = () => {
//   return async dispatch => {
//     const bestBlockHash = await bitcoindRpcClient("getbestblockhash");
//     dispatch(setBestBlockHash(bestBlockHash));
//     return bestBlockHash;
//   };
// };

// export const getBlock = (blockHash: string) => {
//   return async dispatch => {
//     const bestBlockHash = bitcoindRpcClient;
//   };
// };

export const getNetworkInfo = (nonce: __NONCE__) => {
  return async (dispatch: any) => {
    const response = await rpcClient(nonce, "getnetworkinfo");
    dispatch(response);
    return response;
  };
};
