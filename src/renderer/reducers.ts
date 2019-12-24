import { createReducer } from "typesafe-actions";
import { DeepReadonly } from "utility-types";
import { setSystemPreference, receiveBitcoindLine } from "./actions";
import { calculateBitcoindOutput } from "./calculate-bitcoind-output";

export type State = DeepReadonly<{
  systemPreferences: { [name: string]: string };
  bitcoindOutput: { initMessage: string; version: string };
}>;

const initialState: State = {
  systemPreferences: {},
  bitcoindOutput: {
    initMessage: "",
    version: "",
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
  .handleAction(
    receiveBitcoindLine,
    (state, action): State => ({
      ...state,
      bitcoindOutput: calculateBitcoindOutput(
        state.bitcoindOutput,
        action.payload,
      ),
    }),
  );
