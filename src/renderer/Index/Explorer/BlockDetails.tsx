import { Box, Button, ButtonGroup, Paper, useTheme } from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import { useLoadingAwareTypography } from "_r/hooks";
// import { Typography } from "_r/components/Typography";
import * as thunks from "_r/redux/thunks";
import { humanFileSize } from "_r/utils/humanFileSize";
import { formatDate, pluralize } from "_r/utils/smallUtils";
import { withDelay } from "_r/utils/withDelay";
import { Block as TBlock } from "_t/bitcoindRpcResponses";
import { useBlockDetailsStyles } from "./BlockDetailsStyles";

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
  "hash",
];

const dummyBlockData: TBlock = {
  bits: "1a0155de",
  chainwork: "000000000000000000000000000000000000000000000140bf0116a01add88d5",
  confirmations: 1,
  difficulty: 12563071.03178775,
  hash: "0000x000000000e28bb262d7a2306c3efa3cda42c2fc27cf135a4154a02fb0cc",
  height: 1664631,
  mediantime: 1580599789,
  merkleroot:
    "52281b4d8b53c2cd52cc4ce547fcabd993064e0aa56ff66e534569cf1bc17068",
  nTx: 58,
  nonce: 3247988372,
  previousblockhash:
    "000000000000014da63868cd0618f76cd7b46aee4baec51e5f1b7b5c21a74540",
  size: 17246,
  strippedsize: 10550,
  time: 1580602067,
  tx: [
    "5e97b31f2905baf0bf400fe94e7d8b42be9ff8e47ddf4c8c52dcdf0fc33dad5a",
    "d00ba21708b82e51e54f7cd2e88a4d8deed59ce4c5a685dd45642cb84185f194",
    "b756675416b56a6ffe5b3773fed0bf48315e060fdfff2807ed8196c7e3133c17",
    "7c46362774e072a841387845f2eecb25e5557d0d1e0f56d850de22342b17d90c",
    "bd739b5b65ee7c092dcabec0ce26e609eff53aa461f83103c990f0c29374ffe3",
    "dcadb8076cb4c5dff331505106936ae8404c34f0e6fd972ab7e892b6d100893e",
    "235811d0d8e07c68ee759e0000e98c505471681da5eac5cccab9efa6aa32e03c",
    "4773cf0218e31a0cf344920aa70b509efb18a5affff53796496ff99ee839743f",
    "57fe8cca77bbe99d0c0d4c752fabea22b1e4f779a4934bdd3ca51dd83c6c754a",
  ],
  version: 549453824,
  versionHex: "20c00000",
  weight: 48896,
};

const BlockDetails_ = () => {
  const cn = useBlockDetailsStyles();
  const { blockHash } = useParams();
  const [blockData, setBlockData] = useState<TBlock>(dummyBlockData);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const theme = useTheme();
  const selectedExplorerBlock = useSelector(s => s.misc.selectedExplorerBlock);

  useEffect(() => {
    const requestData = async () => {
      setBlockData(dummyBlockData);
      setIsLoading(true);

      const blockData_ = await withDelay(selectedExplorerBlock, 500);

      if (blockData_) {
        setBlockData(blockData_);
        setIsLoading(false);
      }
    };

    requestData();
  }, [selectedExplorerBlock]);

  const Typography = useLoadingAwareTypography(isLoading);

  return (
    <div className={cn.blockDetails}>
      <div className={cn.blockDetailsInnerContainer}>
        <Typography variant="h1" className={cn.title}>
          #{blockData.height.toLocaleString()}
        </Typography>

        <Typography variant="h4" className={cn.hash}>
          {blockData.hash}
        </Typography>

        <div className={clsx(cn.section)}>
          <Typography variant="h2">
            {blockData.nTx && (
              <>
                {blockData.nTx.toLocaleString()}{" "}
                {pluralize(blockData.nTx, "transaction", "transactions")}
              </>
            )}
          </Typography>

          <Paper variant="outlined" className={cn.transactionsPage}>
            <AutoSizer disableHeight>
              {({ width }) => (
                <FixedSizeList
                  key={blockData.hash}
                  itemSize={30}
                  height={theme.spacing(120)}
                  itemCount={blockData.tx.length || 10}
                  width={width}
                  itemData={blockData.tx}
                >
                  {({ index, data, style }) => (
                    <Typography style={style}>{data && data[index]}</Typography>
                  )}
                </FixedSizeList>
              )}
            </AutoSizer>
          </Paper>
        </div>

        <div className={cn.section}>
          <Typography variant="h2" isStatic>
            Details
          </Typography>

          <Paper className={cn.detailsSection}>
            {(Object.keys(blockData) as (keyof TBlock)[]).map(
              (key: keyof TBlock) => {
                if (excludedBlockData.includes(key)) {
                  return null;
                }

                return (
                  <div key={key} className={cn.detailsItem}>
                    <div className={cn.detailsItemKey}>
                      <Typography isStatic className={cn.detailsItemKeyText}>
                        {key}
                      </Typography>
                    </div>
                    <div className={cn.detailsItemValue}>
                      <Typography component="div">
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

        <div className={clsx(cn.section, cn.navigationButtons)}>
          <ButtonGroup orientation="vertical">
            {[
              {
                icon: <KeyboardArrowUp />,
                text: "Next block",
                nextHeight: blockData.height + 1,
              },
              {
                icon: <KeyboardArrowDown />,
                text: "Previous block",
                nextHeight: blockData.height - 1,
              },
            ].map(definition => (
              <Button
                component={Link}
                to={definition.nextHeight.toString() || ""}
                disabled={isLoading}
                key={definition.text}
              >
                <span className={cn.buttonLabel}>
                  <span className={cn.buttonIcon}>{definition.icon}</span>
                  <span className={cn.buttonText}>{definition.text}</span>
                </span>
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export const BlockDetails = BlockDetails_;
