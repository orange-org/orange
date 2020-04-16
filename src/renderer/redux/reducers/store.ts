import { applyMiddleware, compose, createStore as createStore_ } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer";

const reduxDevToolsCompose = (window as any)
  .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers = reduxDevToolsCompose
  ? /* istanbul ignore next */ reduxDevToolsCompose({
      // RECEIVE_BITCOIND_LOG_LINES is too spammy. It floods the Redux Devtools UI
      // actionsBlacklist: ["RECEIVE_BITCOIND_LOG_LINES"],
    })
  : compose;

export const createStore = () =>
  createStore_(reducer, composeEnhancers(applyMiddleware(thunk)));

export const store = createStore();
