import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import * as selectors from "_r/redux/selectors";
import { useSelector } from "react-redux";

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

export const ProgressBar: React.FC = () => {
  const c = useStyles();
  const processingBlocksOnDisk = useSelector(
    selectors.getProcessingBlocksOnDisk,
  );

  if (!processingBlocksOnDisk.active) {
    return null;
  }

  return (
    <div className={c.root}>
      <Typography variant="body2">Doing stuff...</Typography>
      <LinearProgress
        classes={{
          root: c.progressBarRoot,
          bar: c.progressBarBar,
        }}
        variant="determinate"
        value={processingBlocksOnDisk.progress * 100}
      />
    </div>
  );
};
