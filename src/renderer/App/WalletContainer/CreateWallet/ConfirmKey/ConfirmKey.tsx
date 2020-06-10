import { TextField, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAtomicCss } from "_r/useAtomicCss";
import { Thunks } from "_r/redux/Thunks";
import { useDispatch } from "react-redux";
import {
  BackButton,
  getNextStepLink,
  NextButton,
  StepButtons,
} from "../../common/StepButtons";

const useConfiguredFormik = (selectedMnemonic: string) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return useFormik({
    initialValues: {
      confirmedKey: "",
    },
    validate: values => {
      if (
        values.confirmedKey.toLowerCase().trim() !==
        selectedMnemonic.toLowerCase().trim()
      ) {
        return { confirmedKey: "Typed-in key does not match created key" };
      }

      return {};
    },
    onSubmit: async () => {
      await dispatch(Thunks.createWallet(__NONCE__, selectedMnemonic));
      history.replace(getNextStepLink("confirmKey"));
    },
  });
};

export const ConfirmKey: React.FC<{
  selectedMnemonic: string;
}> = ({ selectedMnemonic }) => {
  const a = useAtomicCss();
  const configuredFormik = useConfiguredFormik(selectedMnemonic);
  const hasError =
    configuredFormik.touched.confirmedKey &&
    !!configuredFormik.errors.confirmedKey;

  return (
    <>
      <Typography>
        Type in your key below to confirm that you have saved it correctly:
      </Typography>

      <TextField
        error={hasError}
        helperText={hasError ? configuredFormik.errors.confirmedKey : ""}
        {...configuredFormik.getFieldProps("confirmedKey")}
        className={a("width100%", "marginTop02")}
        multiline
        rows="3"
        placeholder="Your key"
        variant="outlined"
      />

      <StepButtons>
        <BackButton stepName="confirmKey" />

        <NextButton
          stepName="confirmKey"
          onClick={() => configuredFormik.handleSubmit()}
        >
          Confirm key and create wallet
        </NextButton>
      </StepButtons>
    </>
  );
};
