import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ipcRenderer } from "electron";
import { orangeApp } from "./reducers";
import { setSystemPreference } from "./actions";
import { Index } from "./index";

import "./global.scss";

const store = createStore(orangeApp);

ipcRenderer.on("system-preference", (event, message) => {
  store.dispatch(setSystemPreference(message));
});

const mainElement = document.createElement("div");
document.body.appendChild(mainElement);

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
  mainElement,
);
