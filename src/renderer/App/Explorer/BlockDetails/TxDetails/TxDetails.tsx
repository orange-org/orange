import React from "react";
import { useLoadingAwareTypography } from "_r/hooks";
import { useParams } from "react-router-dom";
import { useCcn } from "_r/commonStyles";
import { useTxDetailsStyles } from "./TxDetailsStyles";

export const TxDetails: React.FC<{
  isLoading: boolean;
  marginTopOffset: number;
}> = props => {
  const ccn = useCcn();
  const cn = useTxDetailsStyles();
  const Typography = useLoadingAwareTypography(props.isLoading);
  const { txId } = useParams();

  return (
    <div
      className={cn.txDetails}
      style={{ marginTop: `-${props.marginTopOffset}px` }}
    >
      <div className={cn.shadow} />
      <div className={cn.content}>
        <Typography variant="h2" className={ccn("fontStyleItalic")}>
          Transaction
        </Typography>
        <Typography
          className={ccn("marginTop1", "fontStyleItalic", "colorHint")}
        >
          {txId}
        </Typography>
      </div>
    </div>
  );
};
