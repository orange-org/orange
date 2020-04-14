import { Box, Paper } from "@material-ui/core";
import { ArrowForwardIos } from "@material-ui/icons";
import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLoadingAwareTypography } from "_r/hooks";
import * as thunks from "_r/redux/thunks";
import { useAtomicCss } from "_r/useAtomicCss";
import {
  secondsTimestampToFormattedDate,
  humanFileSize,
} from "_r/utils/smallUtils";
import { RawTransaction } from "_t/bitcoindRpcResponses";
import clsx from "clsx";
import { OtherDetails } from "../OtherDetails";

const SVG_ICON_WIDTH = 24;

const transactionDataFormatters = {
  locktime: secondsTimestampToFormattedDate,
  size: humanFileSize,
  vsize: humanFileSize,
  weight: humanFileSize,
};

const excludedTransactionData = [
  "hex",
  "txid",
  "hash",
  "vin",
  "vout",
  "blockhash",
  "confirmations",
  "blocktime",
  "time",
];

export const TransactionDetails: React.FC<{
  isLoading: boolean;
  marginTopOffset: number;
}> = props => {
  const a = useAtomicCss();
  const Typography = useLoadingAwareTypography(props.isLoading);
  const { transactionId } = useParams();
  const dispatch = useDispatch();
  const transaction = useSelector(s => s.misc.selectedExplorerTransaction);
  const transactionInputValues = useSelector(
    s => s.misc.selectedExplorerTransactionInputValues,
  );

  useEffect(() => {
    dispatch(thunks.requestRawTransactionToDisplay(__NONCE__, transactionId!));
  }, [dispatch, transactionId]);

  if (!transaction || !transactionInputValues) {
    return null;
  }

  const heading = (
    <div className={a("marginLeft02")}>
      <Typography variant="h2" className={a("fontStyleItalic")}>
        Transaction
      </Typography>

      <Typography className={a("marginTop01", "fontStyleItalic", "colorHint")}>
        {transactionId}
      </Typography>
    </div>
  );

  const arrow = (
    <div
      className={a(
        "positionAbsolute",
        "lineHeight0",
        "backgroundColorWhite",
        "zIndex2",
      )}
      style={{
        position: "absolute",
        right: -SVG_ICON_WIDTH / 2,
        top: `calc(50% - ${SVG_ICON_WIDTH / 2}px)`,
      }}
    >
      <ArrowForwardIos className={a("colorDivider")} />
    </div>
  );

  const Column: React.FC<JSX.IntrinsicElements["div"]> = columnProps => (
    <div className={a("displayFlex", "flexDirectionColumn")} {...columnProps} />
  );

  const Cell: React.FC<JSX.IntrinsicElements["div"] & {
    inputCell?: boolean;
    value: number;
    details: RawTransaction["vin"][number] | RawTransaction["vout"][number];
  }> = ({ children: cellChildren, inputCell, value, ...cellProps }) => (
    <div
      {...cellProps}
      className={clsx(
        a(
          "alignItemsCenter",
          "borderColorDivider",
          "borderWidth1",
          "displayFlex",
          "flex1",
          "padding2",
          "paddingX4",
          "positionRelative",
        ),
        cellProps.className,
      )}
    >
      <div
        className={a(
          "displayFlex",
          "minWidth100%",
          inputCell ? "flexDirectionRowReverse" : null,
        )}
      >
        <Typography className={a("whiteSpaceNoWrap", "marginX04")}>
          {value} BTC
        </Typography>

        <Typography
          variant="h5"
          className={a(
            "fontFamilyMonospace",
            "overflowXHidden",
            "whiteSpaceNoWrap",
            "textOverflowEllipsis",
          )}
        >
          {cellChildren}
        </Typography>
      </div>
      {inputCell && arrow}
    </div>
  );

  const breakdown = (
    <>
      <Paper
        className={a("displayGrid", "marginTop02")}
        style={{ gridTemplateColumns: "50% 50%" }}
      >
        <Column>
          {transaction?.vin.map((input, index) => (
            <Cell
              value={transactionInputValues[index]}
              details={input}
              inputCell
              key={input.txid}
              className={a(
                index < transaction.vin.length - 1
                  ? /* istanbul ignore next */ "borderBottomStyleSolid"
                  : null,
                "borderRightStyleSolid",
              )}
            >
              {input.txid}
            </Cell>
          ))}
        </Column>
        <Column>
          {transaction?.vout.map((output, index) => (
            <Cell
              value={output.value}
              details={output}
              key={output.scriptPubKey.hex}
              className={a(
                index < transaction.vout.length - 1
                  ? "borderBottomStyleSolid"
                  : null,
              )}
            >
              {output.scriptPubKey.addresses ||
                /* istanbul ignore next */ output.scriptPubKey.asm}
            </Cell>
          ))}
        </Column>
      </Paper>
      <Typography className={a("marginTop02", "textAlignCenter")}>
        Total:{" "}
        {transaction.vout.reduce((total, output) => {
          return output.value + total;
        }, 0)}{" "}
        BTC
      </Typography>
    </>
  );

  const otherDetails = (
    <OtherDetails
      data={Object.keys(transaction).reduce((data, key) => {
        if (excludedTransactionData.includes(key)) {
          return data;
        }

        data.push([
          key,
          transactionDataFormatters.hasOwnProperty(key) ? (
            // @ts-ignore
            transactionDataFormatters[key](transaction[key])
          ) : (
            <Box fontFamily="Monospace" fontSize="h6.fontSize">
              {
                // @ts-ignore
                transaction[key]
              }
            </Box>
          ),
        ]);

        return data;
      }, [] as [string, ReactElement][])}
    />
  );

  return (
    <div className={a("padding2", "overflowXHidden")}>
      {heading}
      {breakdown}
      {otherDetails}
    </div>
  );
};
