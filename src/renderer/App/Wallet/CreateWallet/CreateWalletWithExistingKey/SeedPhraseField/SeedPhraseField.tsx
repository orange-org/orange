import { TextField, TextFieldProps } from "@material-ui/core";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { TimeoutId } from "_t/typeHelpers";
import { getErrorInfo } from "./getErrorInfo";
import { validateSeedPhrase } from "./validateSeedPhrase";
import { useDetectTyping } from "./useDetectTyping";

export const SeedPhraseField = () => {
  const formik = useFormik({
    initialValues: {
      seedPhrase: "",
    },
    onSubmit: () => undefined,
  });
  const { isTyping, setIsTyping } = useDetectTyping();
  const a = useAtomicCss();
  const onChange: TextFieldProps["onChange"] = event => {
    setIsTyping(true);
    formik.handleChange(event);
  };
  const errors = validateSeedPhrase(formik.values.seedPhrase, !isTyping);
  const { showError, helperText } = getErrorInfo(
    errors,
    !!formik.touched.seedPhrase,
  );

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
        variant="outlined"
      />
    </div>
  );
};
