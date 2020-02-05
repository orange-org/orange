import { Typography, LinearProgress } from "@material-ui/core";
import React from "react";
import { useCurtainStyles } from "./CurtainStyles";

export const Curtain: React.FC<{
  initMessage: string;
  isReady: boolean;
  isShuttingDown: boolean;
}> = props => {
  const cn = useCurtainStyles();

  return (
    <div className={cn.curtain}>
      <div className={cn.centeredText}>
        {props.isShuttingDown ? (
          <>
            <Typography variant="h1">Orange is shutting down</Typography>

            <Typography variant="h3">
              Do not shutdown this computer until this window disappears
            </Typography>
          </>
        ) : (
          <Typography variant="h1">
            {props.isReady ? "Ready!" : props.initMessage}
          </Typography>
        )}
        <LinearProgress
          variant={props.isReady ? "determinate" : "indeterminate"}
          className={cn.progressBar}
          value={100}
          color="secondary"
        />
      </div>
    </div>
  );
};
