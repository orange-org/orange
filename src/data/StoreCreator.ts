/* eslint-disable import/no-mutable-exports */
import { applyMiddleware, compose, createStore, Store } from "redux";
import thunk from "redux-thunk";
import localForage from "localforage";
import { reducer, State } from "./ReducerCreator";

export class StoreCreator {
  private static reduxDevToolsCompose = (window as any)
    .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  private static composeEnhancers =
    StoreCreator.reduxDevToolsCompose || compose;

  private static saveState = (state: State) => {
    localForage.setItem("state", JSON.stringify(state));
  };

  static loadState = async () => {
    const state = await localForage.getItem<string>("state");

    try {
      if (state) {
        return JSON.parse(state) as State;
      }

      return null;
    } catch (e) {
      return null;
    }
  };

  static create = () => {
    const store = createStore(
      reducer,
      StoreCreator.composeEnhancers(applyMiddleware(thunk)),
    );

    let timeoutId: NodeJS.Timeout | null = null;

    store.subscribe(() => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        StoreCreator.saveState(store.getState());
      }, 1000);
    });

    return store;
  };
}

export const store: Store<State> = StoreCreator.create();
