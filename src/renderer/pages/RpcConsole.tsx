import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import {
  Typography,
  makeStyles,
  ButtonGroup,
  Paper,
  Grid,
  Divider,
} from "@material-ui/core";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";

import { sendRpcRequestToMain } from "renderer/redux/SendRpcRequestToMain";
import { usePolling } from "renderer/hooks";
import * as selectors from "renderer/redux/selectors";
import * as actions from "renderer/redux/actions";
import { rpcClient } from "renderer/redux/rpcClient";

const useStyles = makeStyles({
  root: {
    border: "1px solid #dfdfdf",
    borderTopColor: "#dadada",
    margin: "10px",
    marginTop: "30px",
    padding: "25px",

    "& .heading:not(:first-child)": {
      marginTop: "20px",
    },
  },

  table: {
    display: "table",
    borderSpacing: "15px",
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
});

export const RpcConsole: React.FC = () => {
  const c = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.requestNetworkInfo(__NONCE__));
  }, []);

  usePolling(async () => {
    dispatch(actions.requestBlockchainInfoAndBestBlock(__NONCE__));
  }, 1000);

  const networkInfo = useSelector(selectors.getNetworkInfo);
  const bitcoinCoreVersion = useSelector(selectors.getBitcoinCoreVersion);
  const currentNumberOfBlocks = useSelector(selectors.getCurrentNumberOfBlocks);
  const lastBlockTime = useSelector(selectors.getLastBlockTime);

  const renderRow = (name: string, value: string) => {
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
        {renderRow("Client version", bitcoinCoreVersion || "N/A")}
        {renderRow("User agent", networkInfo?.subversion || "N/A")}
        {renderRow("Datadir", "/Users/mk/Library/Application Support/Bitcoin")}
        {renderRow(
          "Blocksdir",
          "/Users/mk/Library/Application Support/Bitcoin/blocks",
        )}
        {renderRow("Startup time", "Fri Dec 27 12:23:43 2010")}
      </div>

      <Divider />

      {renderSectionHeading("Network")}
      <div className={c.table}>
        {renderRow("Name", "main")}
        {renderRow("Number of connections", "0 (In: 0 / Out: 0)")}
      </div>

      <Divider />

      {renderSectionHeading("Block chain")}
      <div className={c.table}>
        {renderRow(
          "Current number of blocks",
          currentNumberOfBlocks?.toString() || "N/A",
        )}
        {renderRow("Last block time", lastBlockTime?.toString() || "N/A")}
      </div>

      <Divider />

      {renderSectionHeading("Memory Pool")}
      <div className={c.table}>
        {renderRow("Current number of transactions", "0")}
        {renderRow("Memory usage", "0.00 KB")}
      </div>
    </Paper>
  );
};
