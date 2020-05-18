import { TextField, TextFieldProps } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { getErrorInfo } from "./getErrorInfo";
import { useDetectTyping } from "./useDetectTyping";
import { validateSeedPhrase } from "./validateSeedPhrase";

export const useSeedPhraseField = () => {
  const formik = useFormik({
    initialValues: {
      seedPhrase: "",
    },
    onSubmit: () => undefined,
  });
  const { isTyping, setIsTyping } = useDetectTyping();
  const errors = validateSeedPhrase(formik.values.seedPhrase, !isTyping);
  const { showError, helperText } = getErrorInfo(
    errors,
    !!formik.touched.seedPhrase,
  );

  return {
    formik,
    showError,
    helperText,
    setIsTyping,
    errors,
  };
};

export const SeedPhraseField: React.FC<ReturnType<
  typeof useSeedPhraseField
>> = ({ formik, showError, helperText, setIsTyping }) => {
  const a = useAtomicCss();
  const onChange: TextFieldProps["onChange"] = event => {
    setIsTyping(true);
    formik.handleChange(event);
  };

  return (
    <div className={a("padding3")}>
      <TextField
        {...formik.getFieldProps("seedPhrase")}
        error={showError}
        helperText={helperText}
        onChange={onChange}
        className={a("width100%")}
        multiline
        rows="3"
        placeholder="Enter your secret 12 to 24 word seed phrase"
        variant="outlined"
      />
    </div>
  );
};
