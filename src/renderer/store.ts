/* eslint-disable no-underscore-dangle */
import { createStore } from "redux";
import { orangeApp } from "./reducers";

export const store = createStore(
  orangeApp,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
