import React, { useEffect } from "react";
import { useLoadingAwareTypography } from "_r/hooks";
import { useParams } from "react-router-dom";
import { useAtomicCss } from "_r/useAtomicCss";
import { useDispatch, useSelector } from "react-redux";
import * as thunks from "_r/redux/thunks";

export const TransactionDetails: React.FC<{
  isLoading: boolean;
  marginTopOffset: number;
}> = props => {
  const a = useAtomicCss();
  const Typography = useLoadingAwareTypography(props.isLoading);
  const { transactionId } = useParams();
  const dispatch = useDispatch();
  const explorerDisplayedTransaction = useSelector(
    s => s.misc.selectedExplorerTransaction,
  );

  useEffect(() => {
    dispatch(thunks.requestRawTransaction(__NONCE__, transactionId!));
  }, [dispatch, transactionId]);

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

  return (
    <div className={a("padding2")}>
      {heading}

      <pre>{JSON.stringify(explorerDisplayedTransaction, null, 2)}</pre>
    </div>
  );
};
