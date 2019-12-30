import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, ButtonGroup, Paper, Grid } from "@material-ui/core";

import { sendRpcRequestToMain } from "renderer/SendRpcRequestToMain";
import { useShortPolling } from "renderer/hooks";
// import { Paper } from "./Paper";

const useStyles = makeStyles({
  root: {
    border: "1px solid #dfdfdf",
    borderTopColor: "#dadada",
    margin: "10px",
    marginTop: "30px",
    padding: "25px",
  },

  navigationButtonsContainingGrid: {
    marginTop: "-40px",
  },

  navigationButton: {
    "&:hover": {
      backgroundColor: "#FFF",
    },
  },
});

export const RpcConsole: React.FC = () => {
  useShortPolling(
    () =>
      sendRpcRequestToMain({
        nonce: __NONCE__,
        method: "getnetworkinfo",
      }),
    1000,
  );
  const c = useStyles();

  return (
    <Paper className={c.root}>
      <Grid
        container
        justify="center"
        className={c.navigationButtonsContainingGrid}
      >
        <Grid item>
          <ButtonGroup variant="contained" color="primary">
            <Button className={c.navigationButton}>Information</Button>
            <Button className={c.navigationButton} disabled>
              Console
            </Button>
            <Button className={c.navigationButton} disabled>
              Network Traffic
            </Button>
            <Button className={c.navigationButton} disabled>
              Peers
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <p>RPC CONSOLE!!</p>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </Paper>
  );
};
