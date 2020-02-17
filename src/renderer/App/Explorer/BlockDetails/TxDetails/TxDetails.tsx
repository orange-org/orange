import React from "react";
import { useLoadingAwareTypography } from "_r/hooks";
import { useParams } from "react-router-dom";
import { useCommonStyles } from "_r/commonStyles";
import clsx from "clsx";
import { useTxDetailsStyles } from "./TxDetailsStyles";

export const TxDetails: React.FC<{
  isLoading: boolean;
  marginTopOffset: number;
}> = props => {
  const ccn = useCommonStyles();
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
        <Typography variant="h2" className={ccn.fontStyleItalic}>
          Transaction
        </Typography>
        <Typography
          className={clsx(ccn.marginTop1, ccn.fontStyleItalic, ccn.colorHint)}
        >
          {txId}
        </Typography>
      </div>
    </div>
  );
};
