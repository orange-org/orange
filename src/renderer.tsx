import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import { orangeApp } from "./reducers";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import { State, MainState } from "./types";

const store = createStore(orangeApp);

const mapStateToProps = (state: State) => {
  console.log("state", state);
  return {
    systemPreferences: state.main.systemPreferences,
  };
};

class Index extends React.Component<MainState> {
  render() {
    console.log("this.props", this.props);
    return (
      <div style={{ background: "#e8e8e8" }}>
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
