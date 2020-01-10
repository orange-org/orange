import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import * as selectors from "_r/redux/selectors";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "auto",
    backgroundImage: "linear-gradient(to bottom, #f9f9f9, #e3e3e3)",
    padding: theme.spacing(1),
    borderTop: "1px solid #bebebe",
    display: "flex",
    alignItems: "center",
  },
  progressBarRoot: {
    marginLeft: theme.spacing(2),
    height: theme.spacing(2),
    backgroundColor: "#dadada",
    border: "1px solid #d4d4d4",
    flex: 1,
    borderRadius: "3px",
  },
  progressBarBar: {
    borderRadius: 3,
    backgroundColor: "#b7b7b7",
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

export const ProgressBar: React.FC = () => {
  const c = useStyles();
  const progressBarState = useProgressBarState();

  return (
    <div className={c.root}>
      <Typography variant="body2">{progressBarState.message}</Typography>
      <LinearProgress
        classes={{
          root: c.progressBarRoot,
          bar: c.progressBarBar,
        }}
        variant="determinate"
        value={progressBarState.progress}
      />
    </div>
  );
};
