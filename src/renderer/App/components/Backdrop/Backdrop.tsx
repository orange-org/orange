import { Backdrop as MuiBackdrop, CircularProgress } from "@material-ui/core";
import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";

export const Backdrop: React.FC<{ open: boolean }> = props => {
  const a = useAtomicCss();

  return (
    <MuiBackdrop
      open={props.open}
      className={a("colorWhite", "zIndexDrawerPlus1")}
    >
      <CircularProgress color="inherit" />
    </MuiBackdrop>
  );
};
