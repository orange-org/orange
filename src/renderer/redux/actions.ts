import { Dispatch } from "redux";
import { createAction } from "typesafe-actions";

import { RpcResponse, NetworkInfo } from "typings/bitcoindRpcResponses";
import { rpcClient } from "renderer/redux/rpcClient";
import { Json } from "typings/types";

export const setSystemPreference = createAction("SET_SYSTEM_PREFERENCE")<
  Json
>();

export const receiveBitcoindLine = createAction("RECEIVE_BITCOIND_LINE")<
  string
>();

export const receiveBitcoindRpcResponse = createAction(
  "RECEIVE_BITCOIND_RPC_RESPONSE",
)<RpcResponse>();

export const setNetworkInfo = createAction("SET_NETWORK_INFO")<NetworkInfo>();

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

export const requestNetworkInfo = (nonce: __NONCE__) => {
  return async (dispatch: Dispatch) => {
    const response = await rpcClient(nonce, { method: "getnetworkinfo" });
    dispatch(setNetworkInfo(response.payload.result));
    return response.payload.result;
  };
};
