import React, { useEffect } from "react";
import { useLoadingAwareTypography } from "_r/hooks";
import { useParams } from "react-router-dom";
import { useAtomicCss } from "_r/useAtomicCss";
import { useDispatch, useSelector } from "react-redux";
import * as thunks from "_r/redux/thunks";
import { useTheme } from "@material-ui/core";
import { BLOCK_DETAILS_PADDING } from "../BlockDetails";

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
  const theme = useTheme();

  useEffect(() => {
    dispatch(thunks.requestRawTransaction(__NONCE__, transactionId!));
  }, [dispatch, transactionId]);

  const sidePadding = -theme.spacing(BLOCK_DETAILS_PADDING - 1);
  const shadowHeight = 100;

  return (
    <div
      className={a("positionRelative")}
      style={{
        // marginTop: `-${props.marginTopOffset}px`,
        marginLeft: sidePadding,
        marginRight: sidePadding,
      }}
    >
      <div
        className={a("backgroundColorDefault")}
        style={{
          height: shadowHeight,
          transform: "perspective(50rem) rotateX(-1deg)",
          boxShadow:
            "0px -2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}
      />
      <div
        className={a("padding2", "positionRelative", "backgroundColorDefault")}
        style={{ marginTop: -shadowHeight }}
      >
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
