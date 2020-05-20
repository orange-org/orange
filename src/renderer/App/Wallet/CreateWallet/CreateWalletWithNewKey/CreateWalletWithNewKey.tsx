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
