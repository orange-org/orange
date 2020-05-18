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
import { Start } from "./Start/Start";
import { ConfirmKey } from "./ConfirmKey/ConfirmKey";
import { useSeedPhraseField } from "../common/SeedPhraseField/SeedPhraseField";
import { steps } from "./steps";
import { OpenWallet } from "./OpenWallet/OpenWallet";

export const CreateWalletWithNewKey = () => {
  const a = useAtomicCss();
  const { hash } = useLocation();
  const history = useHistory();
  const [selectedMnemonic, setSelectedMnemonic] = useState(
    bip39.generateMnemonic(),
  );
  const [confirmedKey, setConfirmedKey] = useState("");

  const generateNewMnemonic = () =>
    setSelectedMnemonic(bip39.generateMnemonic());

  useEffect(() => {
    if (!hash) {
      history.push(`#${steps[0]}`);
    }
  }, [hash, history]);

  const getActiveStep = () => {
    const activeStep = steps.findIndex(step => hash === `#${step}`);

    return activeStep !== -1 ? activeStep : 0;
  };

  return (
    <div className={a("maxWidth800", "marginLeftAuto", "marginRightAuto")}>
      <Typography variant="h1" className={a("marginTop08")}>
        Create a wallet with a new key
      </Typography>

      <Stepper
        activeStep={getActiveStep()}
        orientation="vertical"
        className={a("marginTop05")}
      >
        <Step>
          <StepLabel>Start</StepLabel>

          <StepContent>
            <Start />
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Create key</StepLabel>

          <StepContent>
            <CreateKey
              mnemonic={selectedMnemonic}
              generateNewMnemonic={generateNewMnemonic}
            />
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Confirm your key</StepLabel>

          <StepContent>
            <ConfirmKey selectedMnemonic={selectedMnemonic} />
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Open the wallet</StepLabel>

          <StepContent>
            <OpenWallet />
          </StepContent>
        </Step>
      </Stepper>
    </div>
  );
};
