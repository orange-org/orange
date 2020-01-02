import { createReducer } from "typesafe-actions";
import { DeepReadonly } from "utility-types";

import {
  NetworkInfo,
  BlockchainInfo,
  Block,
} from "typings/bitcoindRpcResponses";
import { OrUndefined } from "typings/typeHelpers";
import {
  setSystemPreference,
  receiveBitcoindLine,
  setNetworkInfo,
  setBlockchainInfo,
  setBlock,
  setBestBlock,
} from "renderer/redux/actions";
import { calculateBitcoindOutput } from "renderer/redux/calculateBitcoindOutput";

export type State = DeepReadonly<
  OrUndefined<{
    systemPreferences: { [name: string]: string };
    lastInitMessage: string;
    bitcoinCoreVersion: string;
    networkInfo: NetworkInfo;
    blockchainInfo: BlockchainInfo;
    lastRequestedBlock: Block;
    bestBlock: Block;
  }>
>;

const initialState: State = {
  systemPreferences: undefined,
  lastInitMessage: undefined,
  bitcoinCoreVersion: undefined,
  networkInfo: undefined,
  blockchainInfo: undefined,
  lastRequestedBlock: undefined,
  bestBlock: undefined,
};

export const orangeApp = createReducer(initialState)
  .handleAction(setSystemPreference, (state, action) => ({
    ...state,
    systemPreferences: {
      ...state.systemPreferences,
      ...action.payload,
    },
  }))
  .handleAction(receiveBitcoindLine, (state, action) => ({
    ...state,
    ...calculateBitcoindOutput(state, action.payload),
  }))
  .handleAction(setNetworkInfo, (state, action) => ({
    ...state,
    networkInfo: action.payload,
  }))
  .handleAction(setBlockchainInfo, (state, action) => ({
    ...state,
    blockchainInfo: action.payload,
  }))
  .handleAction(setBlock, (state, action) => ({
    ...state,
    block: action.payload,
  }))
  .handleAction(setBestBlock, (state, action) => ({
    ...state,
    bestBlock: action.payload,
  }));
