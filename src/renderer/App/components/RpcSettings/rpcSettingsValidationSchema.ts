import * as yup from "yup";
import { Utils } from "_r/utils/Utils";

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
  cookiePath: ifUseDefaultSettingsIsFalse(
    requireIfUseCookieAuthenticationIs(true),
  ),
  serverUrl: ifUseDefaultSettingsIsFalse(
    yup
      .string()
      .required("Required")
      .test({ test: Utils.isValidUrl, message: "A valid URL is required" }),
  ),
});
