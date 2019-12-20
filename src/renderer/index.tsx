import * as React from "react";
import { connect } from "react-redux";
import { MainState, State } from "./types";
import { shouldShowSplashScreen } from "./selectors";
import { SplashScreen } from "./SplashScreen";

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
        {shouldShowSplashScreen && <SplashScreen />}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    systemPreferences: state.main.systemPreferences,
    shouldShowSplashScreen: shouldShowSplashScreen(state),
  };
};

export const Index = connect(mapStateToProps)(IndexComponent);
