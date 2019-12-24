import { createReducer } from "typesafe-actions";
import { setSystemPreference, receiveBitcoindLine } from "./actions";
import { State } from "./types";
import { calculateBitcoindOutput } from "./calculate-bitcoind-output";

const initialState: State = {
  systemPreferences: {},
  bitcoindOutput: {
    initMessage: "",
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
  }));
