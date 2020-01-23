import { createReducer } from "typesafe-actions";
import {
  BlockchainInfo,
  Block,
  MempoolInfo,
  NetworkInfo,
  PeerInfo,
  Uptime,
  RpcInfo,
} from "typings/bitcoindRpcResponses";
import { OrUndefined } from "typings/typeHelpers";
import { DeepReadonly } from "utility-types";
import * as actions from "_r/redux/actions";

type NullableState = DeepReadonly<
  OrUndefined<{
    systemPreferences: { [name: string]: string };
    bitcoinCoreVersion: string;
    dataDir: string;
    networkInfo: NetworkInfo;
    blockchainInfo: BlockchainInfo;
    lastRequestedBlock: Block;
    bestBlock: Block;
    uptime: Uptime;
    peerInfo: PeerInfo;
    mempoolInfo: MempoolInfo;
    synchronizingBlocksProgress: number;
    synchronizingBlockHeadersProgress: number;
    rpcInfo: RpcInfo;
  }>
>;

type UnnullableState = DeepReadonly<{}>;

export type State = NullableState & UnnullableState;

const initialState: State = {
  systemPreferences: undefined,
  bitcoinCoreVersion: undefined,
  dataDir: undefined,
  networkInfo: undefined,
  blockchainInfo: undefined,
  lastRequestedBlock: undefined,
  bestBlock: undefined,
  uptime: undefined,
  peerInfo: undefined,
  mempoolInfo: undefined,
  synchronizingBlocksProgress: undefined,
  synchronizingBlockHeadersProgress: undefined,
  rpcInfo: undefined,
};

export const orangeApp = createReducer(initialState)
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
