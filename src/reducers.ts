import { combineReducers } from "redux";
import { SET_SYSTEM_PREFERENCE } from "./actions";
import { Action, MainState } from "./types";

const initialState: MainState = {
  systemPreferences: { foo: "It workzzz!" },
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
    default:
      return state;
  }
}

export const orangeApp = combineReducers({
  main,
});
