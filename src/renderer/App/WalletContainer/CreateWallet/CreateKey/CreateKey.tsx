import { Button, Typography } from "@material-ui/core";
import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { StepButtons, NextButton, BackButton } from "../../common/StepButtons";

export const CreateKey: React.FC<{
  mnemonic: string;
  generateNewMnemonic: () => void;
}> = ({ mnemonic, generateNewMnemonic }) => {
  const a = useAtomicCss();

  return (
    <>
      <Typography>Your secret key is:</Typography>

      <div>
        <div>
          <Typography className={a("marginTop05", "monospacedTypographyBox")}>
            {mnemonic}
          </Typography>

          <Typography
            className={a(
              "colorPrimary50%Opaque",
              "marginTop01",
              "fontSize0.8Rem",
            )}
          >
            Note: the order of the words is important.
          </Typography>
        </div>
      </div>

      <Button
        variant="text"
        className={a("marginTop05")}
        onClick={generateNewMnemonic}
      >
        Discard the displayed key and create a new one
      </Button>

      <StepButtons>
        <BackButton stepName="createKey" />

        <NextButton stepName="createKey">Use the displayed key</NextButton>
      </StepButtons>
    </>
  );
};
