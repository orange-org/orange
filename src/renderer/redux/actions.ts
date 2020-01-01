import { Dispatch } from "redux";
import { createAction } from "typesafe-actions";

import { RpcResponse, NetworkInfo } from "typings/bitcoindRpcResponses";
import { rpcClient } from "renderer/redux/rpcClient";
import { Json } from "typings/types";
import { BestBlockHashRpcRequest } from "typings/bitcoindRpcRequests";

export const setSystemPreference = createAction("SET_SYSTEM_PREFERENCE")<
  Json
>();

export const receiveBitcoindLine = createAction("RECEIVE_BITCOIND_LINE")<
  string
>();

export const setBestBlockHash = createAction("SET_BEST_BLOCK_HASH")<
  BestBlockHashRpcRequest
>();

export const setNetworkInfo = createAction("SET_NETWORK_INFO")<NetworkInfo>();

export const getBestBlockHash = (nonce: __NONCE__) => {
  return async (dispatch: Dispatch) => {
    const bestBlockHash = await rpcClient(nonce, {
      method: "getbestblockhash",
    });
    dispatch(setBestBlockHash(bestBlockHash.payload.result));
    return bestBlockHash;
  };
};

// export const getBlock = (blockHash: string) => {
//   return async dispatch => {
//     const bestBlockHash = bitcoindRpcClient;
//   };
// };

export const requestNetworkInfo = (nonce: __NONCE__) => {
  return async (dispatch: Dispatch) => {
    const response = await rpcClient<NetworkInfoRpcResponse>(nonce, {
      method: "getnetworkinfo",
      requestId: "",
    });

    dispatch(setNetworkInfo(response.payload.result));
    return response.payload.result;
  };
};
