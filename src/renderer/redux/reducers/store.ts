import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { misc, MiscState } from "./misc";
import { rpcResponses, RpcResponsesState } from "./rpcResponses";
import { isSyncingHeaders, IsSyncingHeadersState } from "./isSyncingHeaders";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // RECEIVE_BITCOIND_LOG_LINES is too spammy. It floods the Redux Devtools UI
    // actionsBlacklist: ["RECEIVE_BITCOIND_LOG_LINES"],
  }) || compose;

export type State = {
  rpcResponses: RpcResponsesState;
  isSyncingHeaders: IsSyncingHeadersState;
} & MiscState;

export const reducer = combineReducers({
  rpcResponses,
  isSyncingHeaders,
  ...misc,

  // Between the `createReducer` function of `typesafe-actions` and here,
  // TypeScript is getting confused. Doing `as any` here to bypass that.
  // Hopefully it won't cause much trouble until we figure out the problem.
} as any);

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk)),
);
