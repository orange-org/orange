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
        Your secret key has been completely removed from this computers memory.
      </Typography>

      <Typography className={paragraphClasses}>
        You will be asked for your key again when performing actions that
        require it.
      </Typography>

      <StepButtons>
        <NextButton stepName="openWallet" onClick={() => console.log("done")}>
          Open wallet
        </NextButton>
      </StepButtons>
    </>
  );
};
