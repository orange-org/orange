import { dirname } from "path";
import { createSelector } from "reselect";
import { State } from "_r/redux/reducers";
import { formatDate } from "_r/smallUtils";

export const systemPreferences = (state: State) => state.systemPreferences;

export const bitcoinCoreVersion = (state: State) => state.networkInfo?.version;

export const networkInfo = (state: State) => state.networkInfo;

export const bestBlockHash = (state: State) =>
  state.blockchainInfo?.bestblockhash;

export const currentNumberOfBlocks = (state: State) =>
  state.blockchainInfo?.blocks;

export const lastBlockTime = (state: State) =>
  state.bestBlock?.time && state.bestBlock.time * 1000;

export const uptime = (state: State) => state.uptime;

export const startupTime = createSelector(uptime, uptime_ => {
  return uptime_ && formatDate(Date.now() - uptime_ * 1000);
});

export const peerInfo = (state: State) => state.peerInfo;

export const connectionSummary = createSelector(peerInfo, peerInfo_ => {
  return peerInfo_?.reduce(
    (connectionSummary_, peer) => {
      /* eslint-disable no-param-reassign */
      connectionSummary_.total += 1;
      connectionSummary_[peer.inbound ? "in" : "out"] += 1;
      /* eslint-enable no-param-reassign */

      return connectionSummary_;
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

export const verificationProgress = (state: State) => {
  return state.blockchainInfo?.verificationprogress;
};

export const synchronizingBlocksProgress = createSelector(
  verificationProgress,
  verificationProgress_ => {
    return verificationProgress_ ? verificationProgress_ * 100 : undefined;
  },
);

export const synchronizingBlockHeadersProgress = (state: State) => {
  return state.synchronizingBlockHeadersProgress;
};

export const networkActive = (state: State) => {
  return state.networkInfo?.networkactive;
};

export const bestHeaderHeight = (state: State) => {
  return state.blockchainInfo?.headers;
};

export const numberOfBlocksLeft = createSelector(
  bestHeaderHeight,
  currentNumberOfBlocks,
  (bestHeaderHeight_, currentNumberOfBlocks_) => {
    return bestHeaderHeight_ && currentNumberOfBlocks_
      ? bestHeaderHeight_ - currentNumberOfBlocks_
      : undefined;
  },
);

export const isSynchronizingBlockHeaders = createSelector(
  synchronizingBlockHeadersProgress,
  synchronizingBlockHeadersProgress_ => {
    return synchronizingBlockHeadersProgress_
      ? synchronizingBlockHeadersProgress_ < 100
      : false;
  },
);

export const logPath = (state: State) => state.rpcInfo?.logpath;

export const dataDir = createSelector(logPath, logPath_ =>
  logPath_ ? dirname(logPath_) : undefined,
);
