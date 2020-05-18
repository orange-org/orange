import { Typography, TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { useFormik } from "formik";
import { error } from "shelljs";
import { useHistory } from "react-router-dom";
import {
  SeedPhraseField,
  useSeedPhraseField,
} from "../../common/SeedPhraseField/SeedPhraseField";
import {
  StepButtons,
  NextButton,
  BackButton,
  getNextStepLink,
} from "../../common/StepButtons";

export const ConfirmKey: React.FC<{
  selectedMnemonic: string;
}> = ({ selectedMnemonic }) => {
  const a = useAtomicCss();
  const history = useHistory();
  const formik = useFormik({
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
    onSubmit: () => {
      history.replace(getNextStepLink("confirmKey"));
    },
  });

  const hasError = formik.touched.confirmedKey && !!formik.errors.confirmedKey;

  return (
    <>
      <Typography>
        Type in your key below to confirm that you have saved it correctly:
      </Typography>

      <TextField
        error={hasError}
        helperText={hasError ? formik.errors.confirmedKey : ""}
        {...formik.getFieldProps("confirmedKey")}
        className={a("width100%", "marginTop02")}
        multiline
        rows="3"
        placeholder="Your key"
        variant="outlined"
      />

      <StepButtons>
        <BackButton stepName="confirmKey" />

        <NextButton stepName="confirmKey" onClick={() => formik.handleSubmit()}>
          Confirm key
        </NextButton>
      </StepButtons>
    </>
  );
};
