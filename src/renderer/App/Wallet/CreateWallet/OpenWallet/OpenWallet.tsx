import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { Typography } from "@material-ui/core";
import { StepButtons, NextButton } from "../../common/StepButtons";

export const OpenWallet = () => {
  const a = useAtomicCss();
  const paragraphClasses = a("marginTop05");

  return (
    <>
      <Typography>Your wallet has been created.</Typography>

      <Typography className={paragraphClasses}>
        You will be asked for your secret key again when performing certain
        actions.
      </Typography>

      <StepButtons>
        <NextButton stepName="openWallet" to="/wallet">
          Open wallet
        </NextButton>
      </StepButtons>
    </>
  );
};
