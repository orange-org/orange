import { ButtonGroup, Divider, Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePolling } from "_r/hooks";
import * as actions from "_r/redux/actions";
import { callMain } from "_r/redux/callMain";
import * as selectors from "_r/redux/selectors";
import { formatDate } from "_r/smallUtils";
import { Section } from "./RpcConsoleComponents";
import { useStyles } from "./RpcConsoleStyles";

export const RpcConsole: React.FC = () => {
  const s = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.requestNetworkInfo(__NONCE__));
    dispatch(actions.requestUptime(__NONCE__));
  }, []);

  usePolling(() => {
    dispatch(actions.requestMempoolInfo(__NONCE__));
  }, 1000);

  const networkInfo = useSelector(selectors.networkInfo);
  const bitcoinCoreVersion = useSelector(selectors.bitcoinCoreVersion);
  const currentNumberOfBlocks = useSelector(selectors.currentNumberOfBlocks);
  const lastBlockTime = useSelector(selectors.lastBlockTime);
  const dataDir = useSelector(selectors.dataDir);
  const startupTime = useSelector(selectors.startupTime);
  const connectionSummary = useSelector(selectors.connectionSummary);
  const mempoolInfo = useSelector(selectors.mempoolInfo);
  const chainName = useSelector(selectors.chainName);
  const showRpcConsole = useSelector(selectors.showRpcConsole);
  const isNetworkActive = useSelector(selectors.networkActive);

  return (
    <div className={s.root}>
      <Paper className={s.paper}>
        <Grid
          container
          item
          justify="center"
          className={s.navigationButtonsContainingGrid}
        >
          <ButtonGroup variant="contained" color="primary">
            <Button className={s.selectedNavigationButton}>Information</Button>
            <Button disabled>Console</Button>
            <Button disabled>Network Traffic</Button>
            <Button disabled>Peers</Button>
          </ButtonGroup>
        </Grid>

        <Section
          title="General"
          rows={[
            ["Client version", bitcoinCoreVersion],
            ["User agent", networkInfo?.subversion],
            ["Datadir", dataDir],
            ["Blocksdir", `${dataDir}/blocks`],
            ["Startup time", startupTime],
          ]}
        />

        <Section
          title="Network"
          rows={[
            ["Name", chainName],
            [
              "Number of connections",
              connectionSummary !== undefined
                ? `${connectionSummary.total} (In: ${
                    connectionSummary.in
                  } / Out: ${connectionSummary.out}) ${
                    isNetworkActive ? "" : "(Network is disabled)"
                  }`
                : undefined,
            ],
          ]}
        />

        <Divider />

        <Section
          title="Block chain"
          rows={[
            [
              "Current number of blocks",
              currentNumberOfBlocks && currentNumberOfBlocks.toLocaleString(),
            ],
            ["Last block time", lastBlockTime && formatDate(lastBlockTime)],
          ]}
        />

        <Divider />

        <Section
          title="Memory pool"
          rows={[
            ["Current number of transactions", mempoolInfo?.size],
            ["Memory usage", mempoolInfo?.usage],
          ]}
        />
      </Paper>

      <Button
        className={s.debugLogButton}
        onClick={() =>
          callMain({
            nonce: __NONCE__,
            type: "open-debug-file",
            message: `${dataDir}/debug.log`,
          })
        }
      >
        Open debug.log
      </Button>
    </div>
  );
};
