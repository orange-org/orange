import { Paper, useTheme } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLoadingAwareTypography } from "_r/hooks";
import * as thunks from "_r/redux/thunks";
import { useAtomicCss } from "_r/useAtomicCss";
import {
  ArrowRightAlt,
  ArrowForward,
  ArrowForwardIos,
} from "@material-ui/icons";

const SVG_ICON_WIDTH = 24;

export const TransactionDetails: React.FC<{
  isLoading: boolean;
  marginTopOffset: number;
}> = props => {
  const a = useAtomicCss();
  const theme = useTheme();
  const Typography = useLoadingAwareTypography(props.isLoading);
  const { transactionId } = useParams();
  const dispatch = useDispatch();
  const displayedTransaction = useSelector(
    s => s.misc.selectedExplorerTransaction,
  );
  const displayedTransactionInputValues = useSelector(
    s => s.misc.selectedExplorerTransactionInputValues,
  );

  useEffect(() => {
    dispatch(thunks.requestRawTransactionToDisplay(__NONCE__, transactionId!));
  }, [dispatch, transactionId]);

  if (!displayedTransaction) {
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

  const triangle = (
    <div
      className={a(
        "positionAbsolute",
        "lineHeight0",
        "backgroundColorWhite",
        "zIndex2",
      )}
      style={{ position: "absolute", right: -SVG_ICON_WIDTH / 2 }}
    >
      <ArrowForwardIos className={a("colorDivider")} />
    </div>
  );
  const triangle_ = (
    <div
      style={{
        position: "absolute",
        right: 1,
        top: "calc(50% - 20px)",
        zIndex: 2,
      }}
    >
      <div
        style={{
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderWidth: "20px 0 20px 20px",
          borderColor: `transparent transparent transparent ${theme.palette.divider}`,
          position: "absolute",
          left: 1,
        }}
      />

      <div
        style={{
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderWidth: "20px 0 20px 20px",
          borderColor: `transparent transparent transparent ${theme.palette.common.white}`,
          position: "absolute",
        }}
      />
    </div>
  );
  type DivComponent = React.FC<
    JSX.IntrinsicElements["div"] & { triangle?: boolean }
  >;
  const Column: DivComponent = columnProps => (
    <div className={a("displayFlex", "flexDirectionColumn")} {...columnProps} />
  );
  const Cell: DivComponent = ({ children: cellChildren, ...cellProps }) => (
    <div
      {...cellProps}
      className={`${a(
        "flex1",
        "displayFlex",
        "alignItemsCenter",
        "padding2",
        "paddingX4",
        "borderColorDivider",
        "borderWidth1",
        "positionRelative",
      )} ${cellProps.className}`}
    >
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
      {cellProps.triangle && triangle}
    </div>
  );
  const breakdown = (
    <Paper
      className={a("displayGrid", "marginTop02")}
      style={{ gridTemplateColumns: "50% 50%" }}
    >
      <Column>
        {displayedTransaction?.vin.map((input, index) => (
          <Cell
            triangle
            key={input.txid}
            className={a(
              index < displayedTransaction.vin.length - 1
                ? "borderBottomStyleSolid"
                : null,
              "borderRightStyleSolid",
            )}
          >
            {input.txid}
          </Cell>
        ))}
      </Column>
      <Column>
        {displayedTransaction?.vout.map((output, index) => (
          <Cell
            key={output.scriptPubKey.hex}
            className={a(
              index < displayedTransaction.vout.length - 1
                ? "borderBottomStyleSolid"
                : null,
            )}
          >
            {output.scriptPubKey.addresses || output.scriptPubKey.asm}
          </Cell>
        ))}
      </Column>
    </Paper>
  );

  return (
    <div className={a("padding2", "overflowXHidden")}>
      {heading}

      {breakdown}

      <pre style={{ fontSize: "1rem" }}>
        {JSON.stringify(displayedTransaction, null, 2)}
      </pre>
      <pre style={{ fontSize: "1rem" }}>
        {JSON.stringify(displayedTransactionInputValues, null, 2)}
      </pre>
    </div>
  );
};
