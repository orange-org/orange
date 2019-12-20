import * as React from "react";
import { connect } from "react-redux";
import { MainState, State } from "./types";

// import * as styles from "./index.module.scss";

export class SplashScreen extends React.Component {
  render() {
    return <div />;
  }
}

// const mapStateToProps = (state: State) => {
//   return {
//     systemPreferences: state.main.systemPreferences,
//     shouldShowSplashScreen: shouldShowSplashScreen(state),
//   };
// };

// export const Index = connect(mapStateToProps)(IndexComponent);
