import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore as createStore_,
} from "redux";
import thunk from "redux-thunk";
import { misc, MiscState } from "./misc";

const reduxDevToolsCompose = (window as any)
  .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers = reduxDevToolsCompose
  ? /* istanbul ignore next */ reduxDevToolsCompose({
      // RECEIVE_BITCOIND_LOG_LINES is too spammy. It floods the Redux Devtools UI
      // actionsBlacklist: ["RECEIVE_BITCOIND_LOG_LINES"],
    })
  : compose;

export type State = {
  misc: MiscState;
};

const reducer = combineReducers({
  misc,

  // Between the `createReducer` function of `typesafe-actions` and here,
  // TypeScript is getting confused. Doing `as any` here to bypass that.
  // Hopefully it won't cause much trouble until we figure out the problem.
} as any);

export const createStore = () =>
  createStore_(reducer, composeEnhancers(applyMiddleware(thunk)));

export const store = createStore();
