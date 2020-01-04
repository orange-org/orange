import {
  ButtonGroup,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePolling } from "renderer/hooks";
import * as actions from "_r/redux/actions";
import * as selectors from "_r/redux/selectors";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(6),
    padding: theme.spacing(6),

    "& .heading:not(:first-child)": {
      marginTop: theme.spacing(6),
    },
  },

  table: {
    display: "table",
    borderSpacing: `${theme.spacing(3)}px`,
  },

  row: {
    display: "table-row",
  },

  cell: {
    display: "table-cell",
  },

  navigationButtonsContainingGrid: {
    marginTop: "-40px",
  },

  navigationButton: {
    "&:active": {
      backgroundImage: "linear-gradient(to bottom, #929297, #545459)",
    },
  },

  selectedNavigationButton: {
    backgroundImage: "linear-gradient(to bottom, #B0B0B5, #909095)",
    color: "#ffffff",
  },
}));

export const RpcConsole: React.FC = () => {
  const c = useStyles();
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

  if (showRpcConsole === false) {
    return null;
  }

  const renderRow = (name: string, value: string | number = "N/A") => {
    return (
      <div className={c.row}>
        <div className={c.cell}>
          <Typography>{name}</Typography>
        </div>
        <div className={c.cell}>
          <Typography>{value}</Typography>
        </div>
      </div>
    );
  };

  const renderSectionHeading = (name: string) => {
    return (
      <Typography variant="h3" className="heading">
        {name}
      </Typography>
    );
  };

  return (
    <Paper className={c.root}>
      <Grid
        container
        item
        justify="center"
        className={c.navigationButtonsContainingGrid}
      >
        <ButtonGroup variant="contained" color="primary">
          <Button
            className={clsx(c.navigationButton, c.selectedNavigationButton)}
          >
            Information
          </Button>
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

      {renderSectionHeading("General")}
      <div className={c.table}>
        {renderRow("Client version", bitcoinCoreVersion)}
        {renderRow("User agent", networkInfo?.subversion)}
        {renderRow("Datadir", dataDir)}
        {renderRow("Blocksdir", `${dataDir}/blocks`)}
        {renderRow("Startup time", startupTime)}
      </div>

      <Divider />

      {renderSectionHeading("Network")}
      <div className={c.table}>
        {renderRow("Name", chainName)}
        {renderRow(
          "Number of connections",
          connectionSummary !== undefined
            ? `${connectionSummary.total} (In: ${connectionSummary.in} / Out: ${connectionSummary.out})`
            : undefined,
        )}
      </div>

      <Divider />

      {renderSectionHeading("Block chain")}
      <div className={c.table}>
        {renderRow("Current number of blocks", currentNumberOfBlocks)}
        {renderRow("Last block time", lastBlockTime)}
      </div>

      <Divider />

      {renderSectionHeading("Memory Pool")}
      <div className={c.table}>
        {renderRow("Current number of transactions", mempoolInfo?.size)}
        {renderRow("Memory usage", mempoolInfo?.usage)}
      </div>
    </Paper>
  );
};
