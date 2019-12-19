import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { ipcRenderer } from "electron";
import { orangeApp } from "./reducers";
import { State, MainState } from "./types";
import { setSystemPreference } from "./actions";

const store = createStore(orangeApp);

ipcRenderer.on("system-preference", (event, message) => {
  store.dispatch(setSystemPreference(message));
});

const mapStateToProps = (state: State) => {
  return {
    systemPreferences: state.main.systemPreferences,
  };
};

class Index extends React.Component<MainState> {
  render() {
    const { systemPreferences } = this.props;

    return (
      <div
        style={{
          background: systemPreferences.colorWindowBackground,
        }}
      >
        {systemPreferences.foo}
      </div>
    );
  }
}

const ConnectedIndex = connect(mapStateToProps)(Index);

const mainElement = document.createElement("div");
document.body.appendChild(mainElement);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedIndex />
  </Provider>,
  mainElement,
);
