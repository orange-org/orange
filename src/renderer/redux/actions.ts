import { Dispatch } from "redux";
import { createAction } from "typesafe-actions";
import { State } from "_r/redux/reducers/store";
import { rpcClient } from "_r/redux/rpcClient";
import { SetNetworkActiveRpcRequest } from "_t/bitcoindRpcRequests";
import {
  Block,
  BlockchainInfo,
  MempoolInfo,
  NetworkInfo,
  PeerInfo,
  RpcInfo,
  Uptime,
} from "_t/bitcoindRpcResponses";
import { Json } from "_t/types";

export type GetState = () => State;

export const setSystemPreference = createAction("SET_SYSTEM_PREFERENCE")<
  Json
>();

export const receiveBitcoindLogLines = createAction(
  "RECEIVE_BITCOIND_LOG_LINES",
)<string[]>();

export const setNetworkInfo = createAction("SET_NETWORK_INFO")<NetworkInfo>();

export const setBlockchainInfo = createAction("SET_BLOCKCHAIN_INFO")<
  BlockchainInfo
>();

export const setBlock = createAction("SET_BLOCK")<Block>();

export const setBestBlock = createAction("SET_BEST_BLOCK")<Block>();

export const setUptime = createAction("SET_UPTIME")<Uptime>();

export const setPeerInfo = createAction("SET_PEER_INFO")<PeerInfo>();

export const setMempoolInfo = createAction("SET_MEMPOOL_INFO")<MempoolInfo>();

export const setRpcInfo = createAction("SET_RPC_INFO")<RpcInfo>();

export const requestNetworkInfo = (nonce: NONCE) => async (
  dispatch: Dispatch,
) => {
  const response = await rpcClient(nonce, { method: "getnetworkinfo" });
  dispatch(setNetworkInfo(response.result));
  return response.result;
};

export const requestBlockchainInfo = (nonce: NONCE) => async (
  dispatch: Dispatch,
) => {
  const response = await rpcClient(nonce, { method: "getblockchaininfo" });
  dispatch(setBlockchainInfo(response.result));
  return response.result;
};

export const requestUptime = (nonce: NONCE) => async (dispatch: Dispatch) => {
  const response = await rpcClient(nonce, { method: "uptime" });
  dispatch(setUptime(response.result));
  return response.result;
};

export const requestBlock = (nonce: NONCE, blockHash: string) => async (
  dispatch: Dispatch,
) => {
  const response = await rpcClient(nonce, {
    method: "getblock",
    params: [blockHash],
  });
  dispatch(setBlock(response.result));
  return response.result;
};

export const requestPeerInfo = (nonce: NONCE) => async (dispatch: Dispatch) => {
  const response = await rpcClient(nonce, { method: "getpeerinfo" });
  dispatch(setPeerInfo(response.result));
  return response.result;
};

export const requestMempoolInfo = (nonce: NONCE) => async (
  dispatch: Dispatch,
) => {
  const response = await rpcClient(nonce, { method: "getmempoolinfo" });
  dispatch(setMempoolInfo(response.result));
  return response.result;
};

export const requestRpcInfo = (nonce: NONCE) => async (dispatch: Dispatch) => {
  const response = await rpcClient(nonce, { method: "getrpcinfo" });
  dispatch(setRpcInfo(response.result));
  return response.result;
};

export const requestBlockchainInfoAndBestBlock = (nonce: NONCE) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    await requestBlockchainInfo(nonce)(dispatch);

    const bestBlockHash = getState().rpcResponses.blockchainInfo?.bestblockhash;

    if (bestBlockHash !== undefined) {
      const bestBlock = await requestBlock(nonce, bestBlockHash)(dispatch);
      dispatch(setBestBlock(bestBlock));
    }
  };
};

export const requestSetNetworkActive = (
  nonce: NONCE,
  isNetworkActive: SetNetworkActiveRpcRequest["params"]["state"],
) => {
  return async (dispatch: Dispatch) => {
    await rpcClient(nonce, {
      method: "setnetworkactive",
      params: { state: isNetworkActive },
    });

    await requestNetworkInfo(nonce)(dispatch);
  };
};
