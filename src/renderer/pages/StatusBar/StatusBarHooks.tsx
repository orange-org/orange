import { useSelector, useDispatch } from "react-redux";
import React from "react";
import connect0Png from "_a/connect0.png";
import connect1Png from "_a/connect1.png";
import connect2Png from "_a/connect2.png";
import connect3Png from "_a/connect3.png";
import connect4Png from "_a/connect4.png";
import networkDisabledPng from "_a/network_disabled.png";
import * as selectors from "_r/redux/selectors";
import * as actions from "_r/redux/actions";
import { useStyles } from "./StatusBarStyles";

export const useNetworkState = () => {
  const c = useStyles();
  const connectionSummary = useSelector(selectors.getConnectionSummary);
  const peerCount = connectionSummary?.total ?? 0;
  const isNetworkActive = useSelector(selectors.networkActive);
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
    selectors.synchronizingBlockHeadersProgress,
  );
  const synchronizingBlocksProgress = useSelector(
    selectors.synchronizingBlocksProgress,
  );
  const connectionSummary = useSelector(selectors.getConnectionSummary);
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
