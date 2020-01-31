import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "_r/components/Typography";
import * as thunks from "_r/redux/thunks";
import { Block as TBlock } from "_t/bitcoindRpcResponses";
import { useBlockDetailsStyles } from "./BlockDetailsStyles";
import { pluralize, formatDate } from "_r/utils/smallUtils";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@material-ui/core";
import { humanFileSize } from "_r/utils/humanFileSize";

const blockDataDefinitions: {
  [P in keyof TBlock]?: typeof formatDate | typeof humanFileSize;
} = {
  mediantime: formatDate,
  size: humanFileSize,
  strippedsize: humanFileSize,
  time: formatDate,
  weight: humanFileSize,
};

const excludedBlockData: (keyof TBlock)[] = [
  "height",
  "nTx",
  "previousblockhash",
  "nextblockhash",
  "tx",
];

export const BlockDetails: React.FC = () => {
  const cn = useBlockDetailsStyles();
  const { blockSearchQuery } = useParams();
  const [blockData, setBlockData] = useState<TBlock | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const requestData = async () => {
      setBlockData(
        await dispatch(thunks.requestBlock(__NONCE__, blockSearchQuery!)),
      );
    };

    requestData();
  }, [blockSearchQuery]);

  if (!blockData) {
    return null;
  }

  return (
    <div className={cn.blockDetails}>
      <Typography variant="h1" className={cn.title}>
        #{blockData.height.toLocaleString()}
      </Typography>

      <Typography variant="h4" className={cn.hash}>
        {blockData.hash}
      </Typography>

      <div className={clsx(cn.section)}>
        <Typography variant="h2">
          {blockData.nTx.toLocaleString()}{" "}
          {pluralize(blockData.nTx, "transaction", "transactions")}
        </Typography>

        <TableContainer component={Paper} className={cn.table}>
          <Table size="small">
            <TableBody>
              {blockData.tx.map(txId => (
                <TableRow key={txId}>
                  <TableCell component="th" scope="row">
                    {txId}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className={cn.section}>
        <Typography variant="h2">Details</Typography>

        <Paper className={cn.detailsSection}>
          {(Object.keys(blockData) as (keyof TBlock)[]).map(
            (key: keyof TBlock) => {
              if (excludedBlockData.includes(key)) {
                return null;
              }

              return (
                <div key={key} className={cn.detailsItem}>
                  <div className={cn.detailsItemKey}>
                    <Typography className={cn.detailsItemKeyText}>
                      {key}
                    </Typography>
                  </div>
                  <div className={cn.detailsItemValue}>
                    <Typography>
                      {blockDataDefinitions[key] ? (
                        blockDataDefinitions[key]!(blockData[key] as any)
                      ) : (
                        <Box fontFamily="Monospace" fontSize="h6.fontSize">
                          {blockData[key]}
                        </Box>
                      )}
                    </Typography>
                  </div>
                </div>
              );
            },
          )}
        </Paper>
      </div>
    </div>
  );
};
