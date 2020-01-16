import { Dispatch } from "redux";
import { State } from "_r/redux/reducers";
import { rpcClient } from "_r/redux/rpcClient";
import * as selectors from "_r/redux/selectors";
import { createAction, PayloadActionCreator } from "typesafe-actions";
import {
  RpcRequest,
  SetNetworkActiveRpcRequest,
} from "typings/bitcoindRpcRequests";
import {
  Block,
  BlockchainInfo,
  MempoolInfo,
  NetworkInfo,
  PeerInfo,
} from "typings/bitcoindRpcResponses";
import { Json } from "typings/types";

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

export const setUptime = createAction("SET_UPTIME")<number>();

export const setPeerInfo = createAction("SET_PEER_INFO")<PeerInfo>();

export const setMempoolInfo = createAction("SET_MEMPOOL_INFO")<MempoolInfo>();

const createSimpleRpcRequest = <T>(
  method: RpcRequest["method"],
  action: PayloadActionCreator<string, T>,
) => {
  return (nonce: NONCE, params?: RpcRequest["params"]) => {
    return async (dispatch: Dispatch) => {
      const response = await rpcClient(nonce, { method, params } as RpcRequest);
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

export const requestUptime = createSimpleRpcRequest<number>(
  "uptime",
  setUptime,
);

export const requestBlock = createSimpleRpcRequest<Block>("getblock", setBlock);

export const requestPeerInfo = createSimpleRpcRequest<PeerInfo>(
  "getpeerinfo",
  setPeerInfo,
);

export const requestMempoolInfo = createSimpleRpcRequest<MempoolInfo>(
  "getmempoolinfo",
  setMempoolInfo,
);

export const requestBlockchainInfoAndBestBlock = (nonce: NONCE) => {
  return async (dispatch: Dispatch, getState: () => State) => {
    await requestBlockchainInfo(nonce)(dispatch);

    const bestBlockHash = selectors.bestBlockHash(getState());

    if (bestBlockHash !== undefined) {
      const bestBlock = await requestBlock(nonce, [bestBlockHash])(dispatch);
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
