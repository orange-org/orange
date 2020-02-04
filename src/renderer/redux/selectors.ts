import { dirname } from "path";
import { createSelector } from "reselect";
import { State } from "_r/redux/reducers/store";
import { formatDate } from "_r/utils/smallUtils";

export const lastBlockTime = createSelector(
  (s: State) => s.misc.bestBlock?.time,
  time_ => (time_ ? time_ * 1000 : null),
);

export const startupTime = createSelector(
  (s: State) => s.rpcResponses.uptime,
  uptime_ => {
    return uptime_ && formatDate(Date.now() - uptime_ * 1000);
  },
);

export const connectionSummary = createSelector(
  (s: State) => s.rpcResponses.peerInfo,
  peerInfo_ => {
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
  },
);

export const synchronizingBlocksProgress = createSelector(
  (s: State) => s.rpcResponses.blockchainInfo?.verificationprogress,
  verificationProgress_ => {
    return verificationProgress_ ? verificationProgress_ * 100 : null;
  },
);

export const numberOfBlocksLeft = createSelector(
  (s: State) => s.rpcResponses.blockchainInfo?.headers,
  (s: State) => s.rpcResponses.blockchainInfo?.blocks,
  (bestHeaderHeight_, currentNumberOfBlocks_) => {
    return bestHeaderHeight_ && currentNumberOfBlocks_
      ? bestHeaderHeight_ - currentNumberOfBlocks_
      : null;
  },
);

export const dataDir = createSelector(
  (s: State) => s.rpcResponses.rpcInfo?.logpath,
  logPath_ => (logPath_ ? dirname(logPath_) : null),
);
