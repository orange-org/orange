import { makeStyles, Paper, Typography } from "@material-ui/core";
import { WarningRounded } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import * as selectors from "_r/redux/selectors";
import * as actions from "_r/redux/actions";

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
  const { rpcResponses } = useStore().getState();

  useEffect(() => {
    dispatch(actions.requestNetworkInfo(__NONCE__));
  }, []);

  const warnings = rpcResponses.blockchainInfo?.warnings;
  const showWarnings = warnings?.length && warnings.length > 0;
  const c = useStyles();

  if (showWarnings === false) {
    return null;
  }

  return (
    <Paper className={c.root}>
      <WarningRounded className={c.warningIcon} fontSize="large" />
      <Typography className={c.text}>{warnings}</Typography>
    </Paper>
  );
};
