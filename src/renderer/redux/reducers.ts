import { createReducer } from "typesafe-actions";
import { DeepReadonly } from "utility-types";

import {
  NetworkInfo,
  BlockchainInfo,
  Block,
  PeerInfo,
  MempoolInfo,
} from "typings/bitcoindRpcResponses";
import { OrUndefined } from "typings/typeHelpers";
import * as actions from "_r/redux/actions";
import { calculateStateFromBitcoindLogLines } from "_r/redux/calculateStateFromBitcoindLogLine";

type NullableState = DeepReadonly<
  OrUndefined<{
    systemPreferences: { [name: string]: string };
    lastInitMessage: string;
    bitcoinCoreVersion: string;
    dataDir: string;
    blockIndex: string;
    networkInfo: NetworkInfo;
    blockchainInfo: BlockchainInfo;
    lastRequestedBlock: Block;
    bestBlock: Block;
    uptime: number;
    peerInfo: PeerInfo;
    mempoolInfo: MempoolInfo;
    synchronizingBlocksProgress: number;
    synchronizingBlockHeadersProgress: number;
    shutdownInProgress: boolean;
  }>
>;

type UnnullableState = DeepReadonly<{}>;

export type State = NullableState & UnnullableState;

const initialState: State = {
  systemPreferences: undefined,
  lastInitMessage: undefined,
  bitcoinCoreVersion: undefined,
  blockIndex: undefined,
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
  shutdownInProgress: undefined,
};

export const orangeApp = createReducer(initialState)
  .handleAction(actions.setSystemPreference, (state, action) => ({
    ...state,
    systemPreferences: {
      ...state.systemPreferences,
      ...action.payload,
    },
  }))
  .handleAction(actions.receiveBitcoindLogLines, (state, action) => ({
    ...state,
    ...calculateStateFromBitcoindLogLines(state, action.payload),
  }))
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
  .handleAction(actions.setMempoolInfo, (state, action) => ({
    ...state,
    mempoolInfo: action.payload,
  }));
