import { FormikHelpers } from "formik";
import { ipcService } from "_r/ipc/ipcService";
import { FormValues } from "./useRpcSettings";

type SubmitHandler = (
  values: FormValues,
  formikHelpers: FormikHelpers<FormValues>,
) => void | Promise<any>;

export const rpcSettingsSubmitHandler = (
  onSuccess: () => void = () => null,
): SubmitHandler => async values => {
  if (values.useDefaultSettings) {
    await ipcService.saveRpcConfigurations(__NONCE__, null);
  } else if (values.useCookieAuthentication) {
    await ipcService.saveRpcConfigurations(__NONCE__, {
      cookieFile: values.cookieFile,
      serverUrl: values.serverUrl,
    });
  } else {
    await ipcService.saveRpcConfigurations(__NONCE__, {
      username: values.username,
      password: values.password,
      serverUrl: values.serverUrl,
    });
  }

  onSuccess();
};
