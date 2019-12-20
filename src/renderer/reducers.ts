import { combineReducers } from "redux";
import { SET_SYSTEM_PREFERENCE, RECEIVE_BITCOIND_LINE } from "./actions";
import { Action, MainState } from "./types";
import { calculateBitcoindOutput } from "./calculate-bitcoind-output";

const initialState: MainState = {
  systemPreferences: { foo: "It workzzz!" },
  bitcoindOutput: {
    initMessage: "",
  },
};

function main(state = initialState, action: Action): MainState {
  switch (action.type) {
    case SET_SYSTEM_PREFERENCE:
      return {
        ...state,
        systemPreferences: {
          ...state.systemPreferences,
          ...action.payload,
        },
      };
    case RECEIVE_BITCOIND_LINE:
      return {
        ...state,
        bitcoindOutput: calculateBitcoindOutput(
          state.bitcoindOutput,
          action.payload,
        ),
      };
    default:
      return state;
  }
}

export const orangeApp = combineReducers({
  main,
});
