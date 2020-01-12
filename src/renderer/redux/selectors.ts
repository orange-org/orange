/* eslint-disable no-param-reassign */
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

export const getDataDir = (state: State) => state.dataDir;

export const getBlockIndex = (state: State) => state.blockIndex;

export const getStartupTime = (state: State) => state.startupTime;

export const getPeerInfo = (state: State) => state.peerInfo;

export const getConnectionSummary = createSelector(getPeerInfo, peerInfo => {
  return peerInfo?.reduce(
    (connectionSummary, peer) => {
      connectionSummary.total += 1;
      connectionSummary[peer.inbound ? "in" : "out"] += 1;

      return connectionSummary;
    },
    { total: 0, in: 0, out: 0 },
  );
});

export const getMempoolInfo = (state: State) => state.mempoolInfo;

export const getChainName = (state: State) => state.blockchainInfo?.chain;

export const getWarnings = (state: State) => {
  return state.blockchainInfo?.warnings || state.networkInfo?.warnings;
};

export const showWarnings = (state: State) => {
  const warningsLength = getWarnings(state)?.length;

  return warningsLength !== undefined && warningsLength > 0;
};

export const getSynchronizingBlocksProgress = (state: State) => {
  return state.synchronizingBlocksProgress;
};

export const getSynchronizingBlockHeadersProgress = (state: State) => {
  return state.synchronizingBlockHeadersProgress;
};

export const isNetworkActive = (state: State) => {
  return state.networkInfo?.networkactive;
};
