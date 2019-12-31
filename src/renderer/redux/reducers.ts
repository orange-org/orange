import { createReducer } from "typesafe-actions";
import { DeepReadonly } from "utility-types";

import { NetworkInfo } from "typings/bitcoindRpcResponses";
import {
  setSystemPreference,
  receiveBitcoindLine,
  receiveBitcoindRpcResponse,
} from "renderer/redux/actions";
import { calculateBitcoindOutput } from "renderer/redux/calculateBitcoindOutput";
import { calculateBitcoindRpcResponses } from "./calculateBitcoindRpcResponses";

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
  .handleAction(receiveBitcoindRpcResponse, (state, action) => ({
    ...state,
    bitcoindRpcResponses: calculateBitcoindRpcResponses(
      state.bitcoindRpcResponses,
      action.payload,
    ),
  }));
