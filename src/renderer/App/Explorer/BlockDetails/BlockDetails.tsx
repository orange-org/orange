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
import {
  Link,
  Route,
  Switch,
  useRouteMatch,
  useParams,
} from "react-router-dom";
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
import { Block as TBlock } from "_t/RpcResponses";
import { testIds } from "_tu/testIds";
import { TransactionDetails } from "./TransactionDetails/TransactionDetails";
import { OtherDetails } from "./OtherDetails";
import { dummyBlockData } from "../common/dummyBlockData";

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

export const BLOCK_DETAILS_PADDING = 6;

export const BlockDetails = () => {
  const { url, path } = useRouteMatch();
  const a = useAtomicCss();
  const [blockData, setBlockData] = useState<TBlock>(dummyBlockData);
  const [isWaitingForData, setIsWaitingForData] = useState(true);
  const theme = useTheme();
  const selectedExplorerBlock = useSelector(s => s.selectedExplorerBlock);
  const { blockHeightAsId } = useParams();

  useEffect(() => {
    let isMounted = true;

    const requestData = async () => {
      setBlockData(dummyBlockData);
      setIsWaitingForData(true);

      const blockData_ = await withDelay(selectedExplorerBlock);

      if (blockData_ && isMounted) {
        setBlockData(blockData_);
        setIsWaitingForData(false);
      }
    };

    requestData();

    return () => {
      isMounted = false;
    };
  }, [selectedExplorerBlock]);

  const isLoading =
    isWaitingForData || Number(blockHeightAsId) !== blockData.height;
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
        data-testid={testIds.blockDetailsH1}
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

      <Paper className={a("marginTop02")}>
        <AutoSizer disableHeight nonce={(__NONCE__ as unknown) as string}>
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
        "borderWidth4px",
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
      data-testid={isLoading ? "" : testIds.blockDetails}
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
