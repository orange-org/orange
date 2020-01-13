import {
  LinearProgress,
  makeStyles,
  Typography,
  Tooltip,
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import connect0Png from "_a/connect0.png";
import connect1Png from "_a/connect1.png";
import connect2Png from "_a/connect2.png";
import connect3Png from "_a/connect3.png";
import connect4Png from "_a/connect4.png";
import networkDisabledPng from "_a/network_disabled.png";
import * as selectors from "_r/redux/selectors";
import * as actions from "_r/redux/actions";

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

const useNetworkState = () => {
  const c = useStyles();
  const connectionSummary = useSelector(selectors.getConnectionSummary);
  const peerCount = connectionSummary?.total ?? 0;
  const isNetworkActive = useSelector(selectors.isNetworkActive);
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

export const StatusBar: React.FC = () => {
  const c = useStyles();
  const progressBarState = useProgressBarState();
  const networkState = useNetworkState();

  return (
    <div className={c.root}>
      <Dialog
        open
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Typography>
            Bitcoin Core is currently syncing. It will download headers and
            blocks from peers and validate them until reaching the tip of the
            block chain.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button color="primary">OK</Button>
        </DialogActions>
      </Dialog>

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
