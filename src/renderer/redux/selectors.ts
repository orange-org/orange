import { createSelector } from "reselect";
import { State } from "./reducers";

export const showSplashScreen = (state: State) =>
  state.bitcoindOutput.initMessage !== "Done loading";

export const showRpcConsole = (state: State) =>
  state.bitcoindOutput.initMessage === "Done loading";

export const getSystemPreferences = (state: State) => state.systemPreferences;

export const getBitcoinCoreVersion = (state: State) =>
  state.bitcoindOutput.version;

export const getBitcoinCoreVersionShort = createSelector(
  getBitcoinCoreVersion,
  bitcoinCoreVersion => {
    return bitcoinCoreVersion.split("-")[0];
  },
);

export const getInitMessage = (state: State) =>
  state.bitcoindOutput.initMessage;
