import React from "react";
import { useLoadingAwareTypography } from "_r/hooks";
import { useParams } from "react-router-dom";
import { useAtomicCss } from "_r/useAtomicCss";
import { useTxDetailsStyles } from "./TxDetailsStyles";

export const TxDetails: React.FC<{
  isLoading: boolean;
  marginTopOffset: number;
}> = props => {
  const a = useAtomicCss();
  const classNames = useTxDetailsStyles();
  const Typography = useLoadingAwareTypography(props.isLoading);
  const { txId } = useParams();

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
          {txId}
        </Typography>
      </div>
    </div>
  );
};
