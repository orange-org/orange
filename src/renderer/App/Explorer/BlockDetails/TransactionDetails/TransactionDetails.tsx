import { Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLoadingAwareTypography } from "_r/hooks";
import * as thunks from "_r/redux/thunks";
import { useAtomicCss } from "_r/useAtomicCss";

export const TransactionDetails: React.FC<{
  isLoading: boolean;
  marginTopOffset: number;
}> = props => {
  const a = useAtomicCss();
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

  type DivComponent = React.FC<JSX.IntrinsicElements["div"]>;
  const Column: DivComponent = columnProps => (
    <div
      className={a("overflowXHidden", "displayFlex", "flexDirectionColumn")}
      {...columnProps}
    />
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
      )} ${cellProps.className}`}
      style={{
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        ...cellProps?.style,
      }}
    >
      <Typography variant="h5" className={a("fontFamilyMonospace")}>
        {cellChildren}
      </Typography>
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

      <pre>{JSON.stringify(displayedTransaction, null, 2)}</pre>
      <pre>{JSON.stringify(displayedTransactionInputValues, null, 2)}</pre>
    </div>
  );
};
