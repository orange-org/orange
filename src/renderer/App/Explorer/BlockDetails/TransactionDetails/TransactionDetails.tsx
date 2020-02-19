import React, { useEffect } from "react";
import { useLoadingAwareTypography } from "_r/hooks";
import { useParams } from "react-router-dom";
import { useAtomicCss } from "_r/useAtomicCss";
import { useDispatch, useSelector } from "react-redux";
import * as thunks from "_r/redux/thunks";
import { useTxDetailsStyles } from "./TransactionDetailsStyles";

export const TxDetails: React.FC<{
  isLoading: boolean;
  marginTopOffset: number;
}> = props => {
  const a = useAtomicCss();
  const classNames = useTxDetailsStyles();
  const Typography = useLoadingAwareTypography(props.isLoading);
  const { transactionId } = useParams();
  const dispatch = useDispatch();
  const explorerDisplayedTransaction = useSelector(
    s => s.misc.selectedExplorerTransaction,
  );

  useEffect(() => {
    dispatch(thunks.requestRawTransaction(__NONCE__, transactionId!));
  }, [dispatch, transactionId]);

  return (
    <div
      className={classNames.txDetails}
      style={{ marginTop: `-${props.marginTopOffset}px` }}
    >
      <div className={classNames.shadow} />
      <div className={classNames.content}>
        <Typography variant="h2" className={a("fontStyleItalic")}>
          Transaction
        </Typography>
        <Typography className={a("marginTop1", "fontStyleItalic", "colorHint")}>
          {transactionId}
        </Typography>

        <pre>{JSON.stringify(explorerDisplayedTransaction, null, 2)}</pre>
      </div>
    </div>
  );
};
