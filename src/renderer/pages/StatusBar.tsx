import {
  LinearProgress,
  makeStyles,
  Typography,
  Grid,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import * as selectors from "_r/redux/selectors";
import connect0Png from "assets/connect0.png";
import connect1Png from "assets/connect1.png";
import connect2Png from "assets/connect2.png";
import connect3Png from "assets/connect3.png";
import connect4Png from "assets/connect4.png";
import networkDisabledPng from "assets/network_disabled.png";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    marginTop: "auto",
    backgroundImage: "linear-gradient(to bottom, #f9f9f9, #e3e3e3)",
    padding: theme.spacing(1),
    borderTop: "1px solid #bebebe",
    height: theme.spacing(7),
  },
  progressBarContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
  },
  progressBarRoot: {
    marginLeft: theme.spacing(2),
    height: theme.spacing(3),
    backgroundColor: "#dadada",
    border: "1px solid #d4d4d4",
    flex: 1,
    borderRadius: 3,
  },
  progressBarBar: {
    borderRadius: 2,
    backgroundColor: "#b7b7b7",
  },
  progressBarMessageContainer: {
    minWidth: "10%",
  },
  img: {
    // height: "100%",
  },
  networkStateContainer: {
    display: "flex",
    justifyContent: "center",
    height: "100%",

    "& *": {
      height: "100%",
    },
  },
  iconButton: {
    backgroundColor: "transparent",
    cursor: "pointer",
    border: "none",
  },
}));

const useProgressBarState = () => {
  const synchronizingBlockHeadersProgress = useSelector(
    selectors.getSynchronizingBlockHeadersProgress,
  );
  const synchronizingBlocksProgress = useSelector(
    selectors.getSynchronizingBlocksProgress,
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

const useNetworkState = (c: ReturnType<typeof useStyles>) => {
  const connectionSummary = useSelector(selectors.getConnectionSummary);
  const peerCount = connectionSummary?.total ?? 0;

  let imgSrc: string;

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

  return {
    networkStateIcon: (
      <button
        className={c.iconButton}
        onClick={() => console.log("stuff")}
        type="button"
      >
        <img
          className={c.img}
          src={imgSrc}
          alt={`${peerCount} peers connected`}
        />
      </button>
    ),
  };
};

export const ProgressBar: React.FC = () => {
  const c = useStyles();
  const progressBarState = useProgressBarState();
  const networkState = useNetworkState(c);

  return (
    <div className={c.root}>
      <div className={c.progressBarContainer}>
        <Typography className={c.progressBarMessageContainer} variant="body2">
          {progressBarState.message}
        </Typography>
        <LinearProgress
          classes={{
            root: c.progressBarRoot,
            bar: c.progressBarBar,
          }}
          variant="determinate"
          // value={42}
          value={progressBarState.progress}
        />
      </div>

      <div className={c.networkStateContainer}>
        {networkState.networkStateIcon}
      </div>
    </div>
  );
};
