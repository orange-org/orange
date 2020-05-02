/* eslint-disable import/no-mutable-exports */
import {
  applyMiddleware,
  compose,
  createStore as createStore_,
  Store,
} from "redux";
import thunk from "redux-thunk";
import { reducer, State } from "./reducer";

const reduxDevToolsCompose = (window as any)
  .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers = reduxDevToolsCompose || compose;

const createStore = () =>
  createStore_(reducer, composeEnhancers(applyMiddleware(thunk)));

let store: Store<State>;

store = createStore();

/**
 * This is needed for testing only
 */
export const resetStore = () => {
  store = createStore();
};

export { store };
