import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Index } from "renderer/Index";
import { store } from "renderer/store";
import { registerListenersForMainProcess } from "renderer/registerListenersForMainProcess";
import { GlobalStyles } from "renderer/globalStyles";

import "typeface-roboto";

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
