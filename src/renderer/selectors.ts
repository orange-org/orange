import { createSelector } from "reselect";
import { State } from "./reducers";

export const shouldShowSplashScreen = (state: State) => {
  return state.bitcoindOutput.initMessage !== "Done loading";
};

export const getSystemPreferences = (state: State) => {
  return state.systemPreferences;
};

export const getBitcoinCoreVersion = (state: State) => {
  return state.bitcoindOutput.version;
};

export const getBitcoinCoreVersionShort = createSelector(
  getBitcoinCoreVersion,
  bitcoinCoreVersion => {
    return bitcoinCoreVersion.split("-")[0];
  },
);

export const getInitMessage = (state: State) =>
  state.bitcoindOutput.initMessage;
