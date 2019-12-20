import * as React from "react";
import { connect } from "react-redux";
import { MainState, State } from "./types";

import * as styles from "./index.module.scss";

class IndexComponent extends React.Component<MainState> {
  render() {
    const { systemPreferences } = this.props;

    return (
      <div
        className={styles.index}
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
