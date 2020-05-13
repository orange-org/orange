import { TextField } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import { getOrdinal } from "_r/utils/smallUtils";
import { useAtomicCss } from "_r/useAtomicCss";

const initialValues = {
  "0": "",
  "1": "",
  "2": "",
  "3": "",
  "4": "",
  "5": "",
  "6": "",
  "7": "",
  "8": "",
  "9": "",
  "10": "",
  "11": "",
  "12": "",
  "13": "",
  "14": "",
  "15": "",
  "16": "",
  "17": "",
  "18": "",
  "19": "",
  "20": "",
  "21": "",
  "22": "",
  "23": "",
} as const;

export const SeedPhraseField = () => {
  const a = useAtomicCss();
  const formik = useFormik({
    onSubmit: () => undefined,
    initialValues,
  });

  return (
    <div className={a("padding3")}>
      <TextField
        className={a("width100%")}
        multiline
        rows="3"
        error
        helperText="Unrecognized word: absdf"
        variant="outlined"
      />
    </div>
  );
};
