import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import * as bip39 from "bip39";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAtomicCss } from "_r/useAtomicCss";
import { CreateKey } from "./CreateKey/CreateKey";
import { steps } from "./steps";
import { Start } from "./Start/Start";
import { ConfirmKey } from "./ConfirmKey/ConfirmKey";
import { OpenWallet } from "./OpenWallet/OpenWallet";

const useAutomaticRedirectToFirstStep = () => {
  const history = useHistory();
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      history.push(`#${steps[0]}`);
    }
  }, [hash, history]);
};

const useActiveStep = () => {
  const { hash } = useLocation();
  const activeStep = steps.findIndex(step => hash === `#${step}`);

  return activeStep !== -1 ? activeStep : 0;
};

const useMnemonic = () => {
  const [selectedMnemonic, setSelectedMnemonic] = useState(
    bip39.generateMnemonic(),
  );

  const generateNewMnemonic = () =>
    setSelectedMnemonic(bip39.generateMnemonic());

  return { selectedMnemonic, generateNewMnemonic };
};

export const CreateWallet = () => {
  const a = useAtomicCss();
  const activeStep = useActiveStep();
  const { selectedMnemonic, generateNewMnemonic } = useMnemonic();

  useAutomaticRedirectToFirstStep();

  return (
    <div className={a("maxWidth800", "marginLeftAuto", "marginRightAuto")}>
      <Typography variant="h1" className={a("marginTop05")}>
        Create a new wallet
      </Typography>

      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        className={a("marginTop05")}
      >
        {([
          ["Start", <Start />],
          [
            "Create key",
            <CreateKey
              mnemonic={selectedMnemonic}
              generateNewMnemonic={generateNewMnemonic}
            />,
          ],
          [
            "Confirm your key",
            <ConfirmKey selectedMnemonic={selectedMnemonic} />,
          ],
          ["Open the wallet", <OpenWallet />],
        ] as const).map(([title, content]) => (
          <Step key={title}>
            <StepLabel>{title}</StepLabel>
            <StepContent>{content}</StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};
