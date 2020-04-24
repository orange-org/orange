import { FormikHelpers } from "formik";
import { FormValues } from "./useBitcoinCoreConnectionSettings";

type SubmitHandler = (
  values: FormValues,
  formikHelpers: FormikHelpers<FormValues>,
) => void | Promise<any>;

export const bitcoinCoreConnectionSettingsSubmitHandler: SubmitHandler = (
  values,
  { setSubmitting },
) => {
  if (values.useDefaultSettings) {
  }
};
