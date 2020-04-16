import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  useTheme,
  Tooltip,
} from "@material-ui/core";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  ExpandLess,
  Today,
  ThumbUpOutlined,
  SaveOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import { useLoadingAwareTypography } from "_r/hooks";
import { useAtomicCss } from "_r/useAtomicCss";
import {
  secondsTimestampToFormattedDate,
  humanFileSize,
  pluralize,
} from "_r/utils/smallUtils";
import { withDelay } from "_r/utils/withDelay";
import { Block as TBlock } from "_t/bitcoindRpcResponses";
import { TransactionDetails } from "./TransactionDetails/TransactionDetails";
import { OtherDetails } from "./OtherDetails";

const blockDataFormatters = {
  mediantime: secondsTimestampToFormattedDate,
  size: humanFileSize,
  strippedsize: humanFileSize,
  time: secondsTimestampToFormattedDate,
  weight: humanFileSize,
};

const excludedBlockData = [
  "height",
  "nTx",
  "previousblockhash",
  "nextblockhash",
  "tx",
  "hash",
  "confirmations",
  "time",
  "size",
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

export const BLOCK_DETAILS_PADDING = 6;

const BlockDetails_ = () => {
  const { url, path } = useRouteMatch();
  const a = useAtomicCss();
  const [blockData, setBlockData] = useState<TBlock>(dummyBlockData);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const selectedExplorerBlock = useSelector(s => s.selectedExplorerBlock);

  useEffect(() => {
    let isMounted = true;

    const requestData = async () => {
      setBlockData(dummyBlockData);
      setIsLoading(true);

      const blockData_ = await withDelay(selectedExplorerBlock);

      if (blockData_ && isMounted) {
        setBlockData(blockData_);
        setIsLoading(false);
      }
    };

    requestData();

    return () => {
      isMounted = false;
    };
  }, [selectedExplorerBlock]);

  const Typography = useLoadingAwareTypography(isLoading);
  const transactionCellHeight = 42;
  const transactionListMaxHeight = theme.spacing(80);
  const transactionListHeight =
    blockData.tx.length < transactionListMaxHeight / transactionCellHeight
      ? /* istanbul ignore next */ blockData.tx.length * transactionCellHeight
      : transactionListMaxHeight;

  const heading = (
    <>
      <Typography
        variant="h1"
        className={a("fontWeight500", "fontStyleItalic")}
      >
        #{blockData.height.toLocaleString()}
      </Typography>
      <Typography
        variant="h4"
        className={a("marginTop01", "colorHint", "fontStyleItalic")}
      >
        {blockData.hash}
      </Typography>
    </>
  );

  const subHeading = (
    <div className={a("displayFlex", "marginTop05")}>
      {([
        [ThumbUpOutlined, blockData.confirmations, "Confirmations"],
        [Today, blockDataFormatters.time(blockData.time), "Time"],
        [SaveOutlined, blockDataFormatters.size(blockData.size), "Size"],
      ] as const).map(([Icon, value, tooltipTitle], index) => (
        <div
          key={tooltipTitle}
          className={a(index > 0 ? "marginLeft10" : null)}
        >
          <Tooltip title={tooltipTitle}>
            <span className={a("displayFlex")}>
              <Icon fontSize="small" />{" "}
              <Typography className={a("marginLeft02")}>{value}</Typography>
            </span>
          </Tooltip>
        </div>
      ))}
    </div>
  );

  const transactionList = (
    <div className={a("marginTop05")}>
      <Typography variant="h2">
        {blockData.nTx && (
          <>
            {blockData.nTx.toLocaleString()}{" "}
            {pluralize(blockData.nTx, "transaction", "transactions")}
          </>
        )}
      </Typography>

      <Paper variant="outlined" className={a("marginTop02")}>
        <AutoSizer disableHeight>
          {({ width }) => (
            <FixedSizeList
              key={blockData.hash}
              itemSize={transactionCellHeight}
              height={transactionListHeight}
              itemCount={blockData.tx.length}
              width={width - 1 /* -1 for the border */}
              itemData={blockData.tx}
            >
              {({ index, data, style }) => (
                <Link
                  className={a("colorPrimary")}
                  to={`${url}/${data[index]}`}
                >
                  <Typography
                    className={a(
                      "padding3",
                      "borderBottomWidth1",
                      "borderBottomColorDivider",
                      "borderBottomStyleSolid",
                      "hoverBackgroundColor",
                      "fontFamilyMonospace",
                      "fontSize130%",
                      "letterSpacing2px",
                    )}
                    variant="body2"
                    style={style}
                  >
                    {data && data[index]}
                  </Typography>
                </Link>
              )}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Paper>
    </div>
  );

  const otherDetails = (
    <OtherDetails
      isLoading={isLoading}
      data={Object.keys(blockData).reduce((data, key) => {
        if (excludedBlockData.includes(key)) {
          return data;
        }

        data.push([
          key,
          blockDataFormatters.hasOwnProperty(key) ? (
            // @ts-ignore
            blockDataFormatters[key](blockData[key])
          ) : (
            <Box fontFamily="Monospace" fontSize="h6.fontSize">
              {
                // @ts-ignore
                blockData[key]
              }
            </Box>
          ),
        ]);

        return data;
      }, [] as [string, ReactElement][])}
    />
  );

  const navigationButtons = (
    <div className={a("marginTop05", "displayFlex", "justifyContentFlexEnd")}>
      <ButtonGroup orientation="vertical">
        {[
          {
            icon: <KeyboardArrowUp />,
            text: "Next block",
            nextHeight: blockData.height + 1,
            cantMove: !blockData.nextblockhash,
          },
          {
            icon: <KeyboardArrowDown />,
            text: "Previous block",
            nextHeight: blockData.height - 1,
            cantMove: !blockData.previousblockhash,
          },
        ].map(definition => (
          <Button
            component={Link}
            to={`/explorer/${definition.nextHeight.toString()}`}
            disabled={isLoading || definition.cantMove}
            key={definition.text}
          >
            <span className={a("alignItemsCenter", "displayFlex", "width100%")}>
              <span className={a("displayFlex")}>{definition.icon}</span>
              <span className={a("flex1")}>{definition.text}</span>
            </span>
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );

  const transactionDetailsContainer = (
    <div
      className={a(
        "borderWidth4",
        "borderColorDividerFade06",
        "borderLeftStyleSolid",
        "marginTop02",
        "marginLeft02",
        "positionRelative",
      )}
    >
      <span
        className={a(
          "backgroundColorDefault",
          "positionAbsolute",
          "paddingTop2",
        )}
        style={{ marginLeft: -theme.spacing(5) }}
      >
        <Button
          className={a("padding0", "minWidthUnset")}
          component={Link}
          to={url}
        >
          <ExpandLess fontSize="large" className={a("colorActionActive")} />
        </Button>
      </span>

      <TransactionDetails
        isLoading={isLoading}
        marginTopOffset={transactionListHeight - theme.spacing(30)}
      />
    </div>
  );

  return (
    <div
      className={a(
        "overflowScroll",
        `padding${BLOCK_DETAILS_PADDING}` as "padding6",
        "paddingLeft2",
      )}
    >
      <div className={a("marginBottom10")}>
        {heading}
        {subHeading}

        <Switch>
          <Route path={path} exact>
            {transactionList}
            {otherDetails}
            {navigationButtons}
          </Route>
          <Route path={`${path}/:transactionId`}>
            {transactionDetailsContainer}
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export const BlockDetails = BlockDetails_;
