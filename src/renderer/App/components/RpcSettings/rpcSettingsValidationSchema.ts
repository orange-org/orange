import * as yup from "yup";
import { isValidUrl } from "_r/utils/smallUtils";

const ifUseDefaultSettingsIsFalse = (require: any) =>
  yup.string().when("useDefaultSettings", {
    is: false,
    then: require,
    otherwise: yup.string().notRequired(),
  });

const requireIfUseCookieAuthenticationIs = (bool: boolean) =>
  yup.string().when("useCookieAuthentication", {
    is: bool,
    then: yup.string().required("Required"),
    otherwise: yup.string().notRequired(),
  });

export const rpcSettingsValidationSchema = yup.object().shape({
  useDefaultSettings: yup.bool(),
  useCookieAuthentication: yup.bool(),
  username: ifUseDefaultSettingsIsFalse(
    requireIfUseCookieAuthenticationIs(false),
  ),
  password: ifUseDefaultSettingsIsFalse(
    requireIfUseCookieAuthenticationIs(false),
  ),
  cookieFile: ifUseDefaultSettingsIsFalse(
    requireIfUseCookieAuthenticationIs(true),
  ),
  serverUrl: ifUseDefaultSettingsIsFalse(
    yup
      .string()
      .required("Required")
      .test({ test: isValidUrl, message: "A valid URL is required" }),
  ),
});
