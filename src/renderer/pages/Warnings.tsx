import { makeStyles, Paper, Typography } from "@material-ui/core";
import { WarningRounded } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "_r/redux/selectors";
import * as actions from "_r/redux/actions";

const useStyles = makeStyles({
  root: {
    margin: "10px",
    marginTop: "10px",
    padding: "5px",
    display: "flex",
    alignItems: "center",
  },

  warningIcon: {
    color: "#e2a932",
  },

  text: {
    marginLeft: "10px",
    fontWeight: 500,
  },
});

export const Warnings: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.requestNetworkInfo(__NONCE__));
  }, []);

  const warnings = useSelector(selectors.getWarnings);
  const c = useStyles();

  return (
    <Paper className={c.root}>
      <WarningRounded className={c.warningIcon} fontSize="large" />
      <Typography className={c.text}>{warnings}</Typography>
    </Paper>
  );
};
