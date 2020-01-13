import { ButtonGroup, Divider, Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePolling } from "_r/hooks";
import * as actions from "_r/redux/actions";
import * as selectors from "_r/redux/selectors";
import { Section } from "./RpcConsoleComponents";
import { useStyles } from "./RpcConsoleStyles";

export const RpcConsole: React.FC = () => {
  const s = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.requestNetworkInfo(__NONCE__));
    dispatch(actions.requestStartupTime(__NONCE__));
  }, []);

  usePolling(() => {
    dispatch(actions.requestBlockchainInfoAndBestBlock(__NONCE__));
    dispatch(actions.requestPeerInfo(__NONCE__));
    dispatch(actions.requestMempoolInfo(__NONCE__));
  }, 1000);

  const networkInfo = useSelector(selectors.getNetworkInfo);
  const bitcoinCoreVersion = useSelector(selectors.getBitcoinCoreVersion);
  const currentNumberOfBlocks = useSelector(selectors.getCurrentNumberOfBlocks);
  const lastBlockTime = useSelector(selectors.getLastBlockTime);
  const dataDir = useSelector(selectors.getDataDir);
  const startupTime = useSelector(selectors.getStartupTime);
  const connectionSummary = useSelector(selectors.getConnectionSummary);
  const mempoolInfo = useSelector(selectors.getMempoolInfo);
  const chainName = useSelector(selectors.getChainName);
  const showRpcConsole = useSelector(selectors.showRpcConsole);
  const isNetworkActive = useSelector(selectors.isNetworkActive);

  if (showRpcConsole === false) {
    return null;
  }

  return (
    <Paper className={s.root}>
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
          ["Current number of blocks", currentNumberOfBlocks],
          ["Last block time", lastBlockTime],
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
  );
};
