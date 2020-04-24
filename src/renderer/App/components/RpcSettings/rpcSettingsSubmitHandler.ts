import { FormikHelpers } from "formik";
import { FormValues } from "./useRpcSettings";

type SubmitHandler = (
  values: FormValues,
  formikHelpers: FormikHelpers<FormValues>,
) => void | Promise<any>;

export const rpcSettingsSubmitHandler: SubmitHandler = (
  values,
  { setSubmitting },
) => {
  if (values.useDefaultSettings) {
  }
};
