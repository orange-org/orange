import * as React from "react";
import { connect } from "react-redux";
import { MainState, State } from "./types";

class IndexComponent extends React.Component<MainState> {
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

const mapStateToProps = (state: State) => {
  return {
    systemPreferences: state.main.systemPreferences,
  };
};

export const Index = connect(mapStateToProps)(IndexComponent);
