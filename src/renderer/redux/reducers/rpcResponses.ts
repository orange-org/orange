import { createReducer } from "typesafe-actions";
import * as actions from "_r/redux/actions";
import {
  BlockchainInfo,
  MempoolInfo,
  NetworkInfo,
  PeerInfo,
  RpcInfo,
  Uptime,
} from "_t/bitcoindRpcResponses";
import { StateConfig } from "_t/typeHelpers";

export type RpcResponsesState = StateConfig<{
  networkInfo: NetworkInfo;
  blockchainInfo: BlockchainInfo;
  uptime: Uptime;
  peerInfo: PeerInfo;
  mempoolInfo: MempoolInfo;
  rpcInfo: RpcInfo;
}>;

export const initialState: RpcResponsesState = {
  networkInfo: null,
  blockchainInfo: null,
  uptime: null,
  peerInfo: null,
  mempoolInfo: null,
  rpcInfo: null,
};

export const rpcResponses = createReducer(initialState)
  .handleAction(actions.setNetworkInfo, (state, action) => ({
    ...state,
    networkInfo: action.payload,
  }))
  .handleAction(actions.setBlockchainInfo, (state, action) => ({
    ...state,
    blockchainInfo: action.payload,
  }))
  .handleAction(actions.setBlock, (state, action) => ({
    ...state,
    block: action.payload,
  }))
  .handleAction(actions.setBestBlock, (state, action) => ({
    ...state,
    bestBlock: action.payload,
  }))
  .handleAction(actions.setUptime, (state, action) => ({
    ...state,
    uptime: action.payload,
  }))
  .handleAction(actions.setPeerInfo, (state, action) => ({
    ...state,
    peerInfo: action.payload,
  }))
  .handleAction(actions.setRpcInfo, (state, action) => ({
    ...state,
    rpcInfo: action.payload,
  }))
  .handleAction(actions.setMempoolInfo, (state, action) => ({
    ...state,
    mempoolInfo: action.payload,
  }));
