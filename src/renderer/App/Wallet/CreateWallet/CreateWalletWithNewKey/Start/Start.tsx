import {
  Button,
  Typography,
  Step,
  StepLabel,
  StepContent,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useAtomicCss } from "_r/useAtomicCss";
import { StepButtons, NextButton } from "../../common/StepButtons";

export const Start: React.FC = () => {
  const a = useAtomicCss();

  return (
    <>
      <Typography>
        Handling Bitcoin without understanding how it works and how to keep it
        safe can lead to serious financial loss.
      </Typography>

      <Typography className={a("marginTop05")}>
        By using a Bitcoin self-custody wallet such as Orange, you are in full
        control of your Bitcoin. This helps protect your funds but at the same
        time it makes you alone responsible for keeping your funds safe.
      </Typography>

      <StepButtons>
        <NextButton stepName="start">I understand</NextButton>
      </StepButtons>
    </>
  );
};
