import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { productName } from "_r/../../package.json";
import { useAtomicCss } from "_r/useAtomicCss";

const useStyles = makeStyles({
  background: {
    background:
      "radial-gradient(circle, rgba(255,255,255,1) 86%, rgba(255,238,225,1) 100%, rgba(255,111,0,1) 100%)",
  },
});

export const SplashScreen: React.FC<{ action: string }> = props => {
  const a = useAtomicCss();
  const styles = useStyles();

  return (
    <div
      className={clsx(
        styles.background,
        a(
          "padding6",
          "displayFlex",
          "flexDirectionColumn",
          "justifyContentCenter",
          "height100%",
        ),
      )}
    >
      <Typography variant="h1" className={a("marginTopNegative02")}>
        {props.action} {productName}...
      </Typography>
      <LinearProgress className={a("marginTop05")} color="secondary" />
    </div>
  );
};
