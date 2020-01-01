/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { orangeApp } from "renderer/redux/reducers";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  orangeApp,
  composeEnhancers(applyMiddleware(thunk)),
);
