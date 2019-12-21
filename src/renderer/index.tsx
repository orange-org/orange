import React from "react";
import { connect } from "react-redux";
// import { State } from "./types";
import { shouldShowSplashScreen } from "./selectors";
import { SplashScreen } from "./SplashScreen";

import * as styles from "./index.module.scss";

type State = {
  systemPreferences: any;
};

class IndexComponent extends React.Component<State> {
  render() {
    const { systemPreferences } = this.props;

    console.log("systemPreferences", systemPreferences);

    return (
      <div
        className={styles.index}
        style={{
          background: systemPreferences.colorWindowBackground,
        }}
      >
        {shouldShowSplashScreen && <SplashScreen />}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    systemPreferences: state.systemPreferences,
    shouldShowSplashScreen: shouldShowSplashScreen(state),
  };
};

export const Index = connect(mapStateToProps)(IndexComponent);
