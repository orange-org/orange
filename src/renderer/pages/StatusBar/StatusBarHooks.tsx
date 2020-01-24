/* eslint-disable no-plusplus */
import { duration } from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import connect0Png from "_a/connect0.png";
import connect1Png from "_a/connect1.png";
import connect2Png from "_a/connect2.png";
import connect3Png from "_a/connect3.png";
import connect4Png from "_a/connect4.png";
import networkDisabledPng from "_a/network_disabled.png";
import * as actions from "_r/redux/actions";
import * as selectors from "_r/redux/selectors";
import { formatDate } from "_r/smallUtils";
import { useStyles } from "./StatusBarStyles";

export const useNetworkState = () => {
  const c = useStyles();
  const s = useStore().getState();
  const connectionSummary = useSelector(selectors.connectionSummary);
  const peerCount = connectionSummary?.total ?? 0;
  const isNetworkActive = s.networkInfo?.networkactive;
  const dispatch = useDispatch();

  let imgSrc: string;

  if (isNetworkActive) {
    if (peerCount === 0) {
      imgSrc = connect0Png;
    } else if (peerCount > 0 && peerCount < 4) {
      imgSrc = connect1Png;
    } else if (peerCount > 3 && peerCount < 7) {
      imgSrc = connect2Png;
    } else if (peerCount > 6 && peerCount < 10) {
      imgSrc = connect3Png;
    } else {
      imgSrc = connect4Png;
    }
  } else {
    imgSrc = networkDisabledPng;
  }

  return {
    networkStateIcon: (
      <button
        className={c.iconButton}
        onClick={() =>
          dispatch(actions.requestSetNetworkActive(__NONCE__, !isNetworkActive))
        }
        type="button"
      >
        <img src={imgSrc} alt={`${peerCount} peers connected`} />
      </button>
    ),
  };
};

export const useProgressBarState = () => {
  const synchronizingBlockHeadersProgress = useSelector(
    s => s.synchronizingBlockHeadersProgress,
  );
  const synchronizingBlocksProgress = useSelector(
    selectors.synchronizingBlocksProgress,
  );
  const connectionSummary = useSelector(selectors.connectionSummary);
  const peerCount = connectionSummary?.total ?? 0;

  if (
    synchronizingBlockHeadersProgress &&
    synchronizingBlockHeadersProgress < 100
  ) {
    return {
      message: "Synchronizing block headers...",
      progress: synchronizingBlockHeadersProgress,
    };
  }

  if (synchronizingBlocksProgress && synchronizingBlocksProgress < 100) {
    return {
      message: "Synchronizing blocks...",
      progress: synchronizingBlocksProgress,
    };
  }

  if (peerCount < 1) {
    return {
      message: "Connecting to peers...",
      progress: 0,
    };
  }

  return {
    message: "",
    progress: 0,
  };
};

const MAX_SAMPLE_SIZE = 5000;
type BlockProcessTimeSample = [number, number][];
const useProgressEstimates = () => {
  const currentDate = Date.now();
  const [blockProcessTimeSamples, setBlockProcessTimeSamples] = useState<
    BlockProcessTimeSample
  >([]);
  const verificationProgress = useSelector(
    s => s.blockchainInfo?.verificationprogress,
  );

  if (!verificationProgress) {
    return undefined;
  }

  // Since we're polling bitcoind for verification progress, we receive
  // multiple verification progress notifications even if there's no
  // progress. The conditions below prevent adding a repeated response
  // to the sample list
  if (
    blockProcessTimeSamples.length === 0 ||
    blockProcessTimeSamples[0][0] !== verificationProgress
  ) {
    blockProcessTimeSamples.unshift([currentDate, verificationProgress]);
  }

  if (blockProcessTimeSamples.length >= 2) {
    let progressPerHour = 0;
    let remainingMilliseconds = 0;
    let progressDelta = 0;
    let timeDelta = 0;

    const remainingProgress = 1.0 - verificationProgress;

    for (let i = 1; i < blockProcessTimeSamples.length; i++) {
      const sample = blockProcessTimeSamples[i];

      if (
        sample[0] < currentDate - 500 * 1000 ||
        i === blockProcessTimeSamples.length - 1
      ) {
        progressDelta = blockProcessTimeSamples[0][1] - sample[1];
        timeDelta = blockProcessTimeSamples[0][0] - sample[0];
        progressPerHour = (progressDelta / timeDelta) * 1000 * 3600;
        remainingMilliseconds =
          progressDelta > 0
            ? (remainingProgress / progressDelta) * timeDelta
            : -1;
        break;
      }
    }

    if (blockProcessTimeSamples.length > MAX_SAMPLE_SIZE) {
      blockProcessTimeSamples.splice(
        MAX_SAMPLE_SIZE,
        blockProcessTimeSamples.length - MAX_SAMPLE_SIZE,
      );

      setBlockProcessTimeSamples(blockProcessTimeSamples);
    }

    if (progressPerHour < 0 || remainingMilliseconds < 0) {
      return undefined;
    }

    return {
      progressPerHour,
      remainingMilliseconds,
    };
  }

  return undefined;
};

export const useDetailsDialogState = () => {
  const s = useStore().getState();

  const lastBlockTime = useSelector(selectors.lastBlockTime);
  const numberOfBlocksLeft = useSelector(selectors.numberOfBlocksLeft);
  const isSynchronizingBlockHeaders = useSelector(
    selectors.isSynchronizingBlockHeaders,
  );
  const progressEstimates = useProgressEstimates();

  return {
    numberOfBlocksLeft: isSynchronizingBlockHeaders
      ? `Unknown. Syncing Headers (${s.blockchainInfo?.headers?.toLocaleString()}, ${s.synchronizingBlockHeadersProgress!.toFixed(
          2,
        )})...`
      : numberOfBlocksLeft?.toLocaleString(),
    lastBlockTime: formatDate(lastBlockTime),
    progressPerHour:
      progressEstimates?.progressPerHour &&
      `${Math.ceil(progressEstimates.progressPerHour * 100)}%`,
    remainingMilliseconds:
      progressEstimates?.remainingMilliseconds &&
      duration(progressEstimates.remainingMilliseconds).humanize(),
  };
};
