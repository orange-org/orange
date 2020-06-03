/* eslint-disable import/no-mutable-exports */
import { applyMiddleware, compose, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { reducer, State } from "./ReducerCreator";

class StoreCreator {
  private static reduxDevToolsCompose = (window as any)
    .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  private static composeEnhancers =
    StoreCreator.reduxDevToolsCompose || compose;

  static create = () =>
    createStore(reducer, StoreCreator.composeEnhancers(applyMiddleware(thunk)));
}

export const store: Store<State> = StoreCreator.create();
