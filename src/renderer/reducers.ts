import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import { setSystemPreference, receiveBitcoindLine } from "./actions";
import { State } from "./types";
import { calculateBitcoindOutput } from "./calculate-bitcoind-output";

const initialState: State = {
  systemPreferences: { foo: "It workzzz!" },
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

// function main(state = initialState, action: Action): MainState {
//   switch (action.type) {
//     case SET_SYSTEM_PREFERENCE:
//       return {
//         ...state,
//       };
//     case RECEIVE_BITCOIND_LINE:
//       return {
//         ...state,
//         bitcoindOutput: calculateBitcoindOutput(
//           state.bitcoindOutput,
//           action.payload,
//         ),
//       };
//     default:
//       return state;
//   }
// }

// export const orangeApp = combineReducers({
//   main,
// });
