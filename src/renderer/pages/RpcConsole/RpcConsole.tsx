import { ButtonGroup, Divider, Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePolling, useRpcResponses } from "_r/hooks";
import * as actions from "_r/redux/actions";
import { callMain } from "_r/redux/callMain";
import * as selectors from "_r/redux/selectors";
import { formatDate } from "_r/smallUtils";
import { Section } from "./RpcConsoleComponents";
import { useStyles } from "./RpcConsoleStyles";

export const RpcConsole: React.FC = () => {
  const c = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.requestNetworkInfo(__NONCE__));
    dispatch(actions.requestUptime(__NONCE__));
    dispatch(actions.requestRpcInfo(__NONCE__));
  }, []);

  usePolling(() => {
    dispatch(actions.requestMempoolInfo(__NONCE__));
    dispatch(actions.requestBlockchainInfo(__NONCE__));
    dispatch(actions.requestPeerInfo(__NONCE__));
  }, 1000);

  const rpcResponses = useRpcResponses();
  const lastBlockTime = useSelector(selectors.lastBlockTime);
  const dataDir = useSelector(selectors.dataDir);
  const startupTime = useSelector(selectors.startupTime);
  const connectionSummary = useSelector(selectors.connectionSummary);

  return (
    <div className={c.root}>
      <Paper className={c.paper}>
        <Grid
          container
          item
          justify="center"
          className={c.navigationButtonsContainingGrid}
        >
          <ButtonGroup variant="contained" color="primary">
            <Button className={c.selectedNavigationButton}>Information</Button>
            <Button disabled>Console</Button>
            <Button disabled>Network Traffic</Button>
            <Button disabled>Peers</Button>
          </ButtonGroup>
        </Grid>

        <Section
          title="General"
          rows={[
            ["Client version", rpcResponses.networkInfo?.version],
            ["User agent", rpcResponses.networkInfo?.subversion],
            ["Datadir", dataDir],
            ["Startup time", startupTime],
          ]}
        />

        <Section
          title="Network"
          rows={[
            ["Name", rpcResponses.blockchainInfo?.chain],
            [
              "Number of connections",
              connectionSummary
                ? `${connectionSummary.total} (In: ${
                    connectionSummary.in
                  } / Out: ${connectionSummary.out}) ${
                    rpcResponses.networkInfo?.networkactive
                      ? ""
                      : "(Network is disabled)"
                  }`
                : null,
            ],
          ]}
        />

        <Divider />

        <Section
          title="Block chain"
          rows={[
            [
              "Current number of blocks",
              rpcResponses.blockchainInfo?.blocks?.toLocaleString(),
            ],
            ["Last block time", lastBlockTime && formatDate(lastBlockTime)],
          ]}
        />

        <Divider />

        <Section
          title="Memory pool"
          rows={[
            ["Current number of transactions", rpcResponses.mempoolInfo?.size],
            ["Memory usage", rpcResponses.mempoolInfo?.usage],
          ]}
        />
      </Paper>

      <Button
        className={c.debugLogButton}
        onClick={() =>
          callMain({
            nonce: __NONCE__,
            type: "open-debug-file",
          })
        }
      >
        Open debug.log
      </Button>
    </div>
  );
};
