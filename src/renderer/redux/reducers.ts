import { createReducer } from "typesafe-actions";
import { DeepReadonly } from "utility-types";

import { NetworkInfo } from "typings/bitcoindRpcResponses";
import {
  setSystemPreference,
  receiveBitcoindLine,
  setNetworkInfo,
} from "renderer/redux/actions";
import { calculateBitcoindOutput } from "renderer/redux/calculateBitcoindOutput";

export type State = DeepReadonly<{
  systemPreferences: { [name: string]: string } | undefined;
  bitcoindOutput: Partial<{ initMessage: string; version: string }> | undefined;
  bitcoindRpcResponses: {
    networkInfo: NetworkInfo | undefined;
  };
}>;

const initialState: State = {
  systemPreferences: undefined,
  bitcoindOutput: undefined,
  bitcoindRpcResponses: {
    networkInfo: undefined,
  },
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
    bitcoindOutput: calculateBitcoindOutput(
      state.bitcoindOutput,
      action.payload,
    ),
  }))
  .handleAction(setNetworkInfo, (state, action) => ({
    ...state,
    bitcoindRpcResponses: {
      ...state.bitcoindRpcResponses,
      networkInfo: action.payload,
    },
  }));
