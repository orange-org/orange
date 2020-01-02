import { createSelector } from "reselect";
import { State } from "./reducers";

export const showSplashScreen = (state: State) =>
  state.lastInitMessage !== "Done loading";

export const showRpcConsole = (state: State) =>
  state.lastInitMessage === "Done loading";

export const getSystemPreferences = (state: State) => state.systemPreferences;

export const getBitcoinCoreVersion = (state: State) => state.bitcoinCoreVersion;

export const getBitcoinCoreVersionShort = createSelector(
  getBitcoinCoreVersion,
  bitcoinCoreVersion => {
    return bitcoinCoreVersion?.split("-")[0];
  },
);

export const getInitMessage = (state: State) => state.lastInitMessage;

export const getNetworkInfo = (state: State) => state.networkInfo;

export const getBestBlockHash = (state: State) =>
  state.blockchainInfo?.bestblockhash;

export const getCurrentNumberOfBlocks = (state: State) =>
  state.blockchainInfo?.blocks;

export const getLastBlockTime = (state: State) => state.bestBlock?.time;
