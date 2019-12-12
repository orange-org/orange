import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import { orangeApp } from "./reducers";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import { State, MainState } from "./types";
import { ipcRenderer } from "electron";
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
    return (
      <div
        style={{
          background: this.props.systemPreferences.colorWindowBackground,
        }}
      >
        {this.props.systemPreferences.foo}
      </div>
    );
  }
}

const ConnectedIndex = connect(mapStateToProps)(Index);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedIndex />
  </Provider>,
  document.getElementById("app"),
);
