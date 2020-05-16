import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { Typography, Paper } from "@material-ui/core";
import { SeedPhraseField } from "./SeedPhraseField/SeedPhraseField";

export const OpenExistingWallet = () => {
  const a = useAtomicCss();

  return (
    <div className={a("maxWidth800", "marginLeftAuto", "marginRightAuto")}>
      <Typography className={a("marginTop05")} variant="h1">
        Access an existing wallet
      </Typography>

      <Paper className={a("marginTop02", "padding3")}>
        <Typography>
          Enter your secret seed phrase to unlock the wallet
        </Typography>

        <SeedPhraseField />
      </Paper>
    </div>
  );
};
