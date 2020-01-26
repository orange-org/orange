import { makeStyles, Paper, Typography } from "@material-ui/core";
import { WarningRounded } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import * as thunks from "_r/redux/thunks";
import { usePolling, useRpcResponses } from "_r/hooks";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },

  warningIcon: {
    color: "#e2a932",
  },

  text: {
    marginLeft: theme.spacing(2),
    fontWeight: 500,
  },
}));

export const Warnings: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunks.requestNetworkInfo(__NONCE__));
  }, []);

  const warnings = useRpcResponses(r => r.networkInfo?.warnings);
  const showWarnings = warnings?.length && warnings.length > 0;
  const c = useStyles();

  if (!showWarnings) {
    return null;
  }

  return (
    <Paper className={c.root}>
      <WarningRounded className={c.warningIcon} fontSize="large" />
      <Typography className={c.text}>{warnings}</Typography>
    </Paper>
  );
};
