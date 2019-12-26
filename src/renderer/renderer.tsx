import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Index } from "./index";
import { store } from "./store";
import { registerListenersForMainProcess } from "./register-listeners-for-main-process";
import { GlobalStyles } from "./global-styles";

registerListenersForMainProcess();

const mainElement = document.createElement("div");
document.body.appendChild(mainElement);

ReactDOM.render(
  <Provider store={store}>
    <Index />
    <GlobalStyles />
  </Provider>,
  mainElement,
);
