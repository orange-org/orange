/* eslint-disable no-param-reassign */
import { createSelector } from "reselect";
import { State } from "./reducers";

export const showSplashScreen = (state: State) =>
  state.lastInitMessage !== "Done loading";

export const showRpcConsole = (state: State) =>
  state.lastInitMessage === "Done loading";

export const systemPreferences = (state: State) => state.systemPreferences;

export const bitcoinCoreVersion = (state: State) => state.bitcoinCoreVersion;

export const shortBitcoinCoreVersion = createSelector(
  bitcoinCoreVersion,
  bitcoinCoreVersion => {
    return bitcoinCoreVersion?.split("-")[0];
  },
);

export const initMessage = (state: State) => state.lastInitMessage;

export const networkInfo = (state: State) => state.networkInfo;

export const bestBlockHash = (state: State) =>
  state.blockchainInfo?.bestblockhash;

export const currentNumberOfBlocks = (state: State) =>
  state.blockchainInfo?.blocks;

export const lastBlockTime = (state: State) => state.bestBlock?.time;

export const dataDir = (state: State) => state.dataDir;

export const blockIndex = (state: State) => state.blockIndex;

export const startupTime = (state: State) => state.startupTime;

export const peerInfo = (state: State) => state.peerInfo;

export const getConnectionSummary = createSelector(peerInfo, peerInfo => {
  return peerInfo?.reduce(
    (connectionSummary, peer) => {
      connectionSummary.total += 1;
      connectionSummary[peer.inbound ? "in" : "out"] += 1;

      return connectionSummary;
    },
    { total: 0, in: 0, out: 0 },
  );
});

export const mempoolInfo = (state: State) => state.mempoolInfo;

export const chainName = (state: State) => state.blockchainInfo?.chain;

export const warnings = (state: State) => {
  return state.blockchainInfo?.warnings || state.networkInfo?.warnings;
};

export const showWarnings = (state: State) => {
  const warningsLength = warnings(state)?.length;

  return warningsLength !== undefined && warningsLength > 0;
};

export const synchronizingBlocksProgress = (state: State) => {
  return state.synchronizingBlocksProgress;
};

export const synchronizingBlockHeadersProgress = (state: State) => {
  return state.synchronizingBlockHeadersProgress;
};

export const networkActive = (state: State) => {
  return state.networkInfo?.networkactive;
};
