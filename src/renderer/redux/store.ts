/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { orangeApp } from "renderer/redux/reducers";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // RECEIVE_BITCOIND_LOG_LINE is too spammy. It floods the Redux Devtools UI
    actionsBlacklist: ["RECEIVE_BITCOIND_LOG_LINE"],
  }) || compose;

export const store = createStore(
  orangeApp,
  composeEnhancers(applyMiddleware(thunk)),
);
