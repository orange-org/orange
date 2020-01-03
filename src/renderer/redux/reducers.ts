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
import * as actions from "renderer/redux/actions";
import { calculateStateFromBitcoindLogLine } from "renderer/redux/calculateStateFromBitcoindLogLine";

export type State = DeepReadonly<
  OrUndefined<{
    systemPreferences: { [name: string]: string };
    lastInitMessage: string;
    bitcoinCoreVersion: string;
    dataDir: string;
    blockIndex: string;
    startupTime: string;
    networkInfo: NetworkInfo;
    blockchainInfo: BlockchainInfo;
    lastRequestedBlock: Block;
    bestBlock: Block;
    uptime: number;
    peerInfo: PeerInfo;
    mempoolInfo: MempoolInfo;
  }>
>;

const initialState: State = {
  systemPreferences: undefined,
  lastInitMessage: undefined,
  bitcoinCoreVersion: undefined,
  blockIndex: undefined,
  dataDir: undefined,
  startupTime: undefined,
  networkInfo: undefined,
  blockchainInfo: undefined,
  lastRequestedBlock: undefined,
  bestBlock: undefined,
  uptime: undefined,
  peerInfo: undefined,
  mempoolInfo: undefined,
};

export const orangeApp = createReducer(initialState)
  .handleAction(actions.setSystemPreference, (state, action) => ({
    ...state,
    systemPreferences: {
      ...state.systemPreferences,
      ...action.payload,
    },
  }))
  .handleAction(actions.receiveBitcoindLine, (state, action) => ({
    ...state,
    ...calculateStateFromBitcoindLogLine(state, action.payload),
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
  .handleAction(actions.setStartupTime, (state, action) => ({
    ...state,
    startupTime: action.payload,
  }))
  .handleAction(actions.setPeerInfo, (state, action) => ({
    ...state,
    peerInfo: action.payload,
  }))
  .handleAction(actions.setMempoolInfo, (state, action) => ({
    ...state,
    mempoolInfo: action.payload,
  }));
