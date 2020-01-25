import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { misc, MiscState } from "./misc";
import { rpcResponses, RpcResponsesState } from "./rpcResponses";
import {
  synchronizingBlockHeadersProgress,
  SynchronizingBlockHeadersProgressState,
} from "./synchronizingBlockHeadersProgress";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // RECEIVE_BITCOIND_LOG_LINES is too spammy. It floods the Redux Devtools UI
    // actionsBlacklist: ["RECEIVE_BITCOIND_LOG_LINES"],
  }) || compose;

export type State = {
  rpcResponses: RpcResponsesState;
  synchronizingBlockHeadersProgress: SynchronizingBlockHeadersProgressState;
} & MiscState;

export const reducer = combineReducers({
  rpcResponses,
  synchronizingBlockHeadersProgress,
  ...misc,

  // Between the `createReducer` function of `typesafe-actions` and here,
  // TypeScript is getting confused. Doing `as any` here to bypass that.
  // Hopefully it won't cause much trouble until we figure out the problem.
} as any);

const logger = (store: any) => (next: any) => (action: any) => {
  if (action.cacheOptions) {
    // do caching and what not
    // if we need to return the cache, do it,
    // otherwise, pass the thunk next
    return next(action.thunk);
  }

  return next(action);
};

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(logger, thunk)),
);