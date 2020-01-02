import { Dispatch } from "redux";
import { createAction, PayloadActionCreator } from "typesafe-actions";

import {
  NetworkInfo,
  BlockchainInfo,
  Block,
} from "typings/bitcoindRpcResponses";
import { rpcClient } from "renderer/redux/rpcClient";
import { Json } from "typings/types";
import { RpcRequest } from "typings/bitcoindRpcRequests";
import { State } from "renderer/redux/reducers";
import * as selectors from "renderer/redux/selectors";

export const setSystemPreference = createAction("SET_SYSTEM_PREFERENCE")<
  Json
>();

export const receiveBitcoindLine = createAction("RECEIVE_BITCOIND_LOG_LINE")<
  string
>();

export const setNetworkInfo = createAction("SET_NETWORK_INFO")<NetworkInfo>();

export const setBlockchainInfo = createAction("SET_BLOCKCHAIN_INFO")<
  BlockchainInfo
>();

export const setBlock = createAction("SET_BLOCK")<Block>();

export const setBestBlock = createAction("SET_BEST_BLOCK")<Block>();

const createSimpleRpcRequest = <T>(
  method: RpcRequest["method"],
  action: PayloadActionCreator<string, T>,
) => {
  return (nonce: NONCE, params?: RpcRequest["params"]) => {
    return async (dispatch: Dispatch) => {
      const response = await rpcClient(nonce, { method, params });
      dispatch(action((response.payload.result as unknown) as T));

      return (response.payload.result as unknown) as T;
    };
  };
};

export const requestNetworkInfo = createSimpleRpcRequest<NetworkInfo>(
  "getnetworkinfo",
  setNetworkInfo,
);

export const requestBlockchainInfo = createSimpleRpcRequest<BlockchainInfo>(
  "getblockchaininfo",
  setBlockchainInfo,
);

export const requestBlock = createSimpleRpcRequest<Block>("getblock", setBlock);

export const requestBlockchainInfoAndBestBlock = (nonce: NONCE) => {
  return async (dispatch: Dispatch, getState: () => State) => {
    await requestBlockchainInfo(nonce)(dispatch);

    const bestBlockHash = selectors.getBestBlockHash(getState());

    if (bestBlockHash !== undefined) {
      const bestBlock = await requestBlock(nonce, [bestBlockHash])(dispatch);
      dispatch(setBestBlock(bestBlock));
    }
  };
};
