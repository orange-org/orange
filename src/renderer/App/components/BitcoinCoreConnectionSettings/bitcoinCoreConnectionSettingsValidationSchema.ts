import * as yup from "yup";
import { isValidUrl } from "_r/utils/smallUtils";

const requireIfUseCookieAuthenticationIs = (bool: boolean) =>
  yup.string().when("useCookieAuthentication", {
    is: bool,
    then: yup.string().required("Required"),
    otherwise: yup.string().notRequired(),
  });

export const bitcoinCoreConnectionSettingsValidationSchema = yup
  .object()
  .shape({
    useCookieAuthentication: yup.bool(),
    username: requireIfUseCookieAuthenticationIs(false),
    password: requireIfUseCookieAuthenticationIs(false),
    cookieFile: requireIfUseCookieAuthenticationIs(true),
    serverUrl: yup
      .string()
      .required("Required")
      .test({ test: isValidUrl, message: "A valid URL is required" }),
  });
