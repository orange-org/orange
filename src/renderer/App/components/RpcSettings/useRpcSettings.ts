import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { DEFAULT_SERVER_URL } from "_c/constants";
import { useConnectionStatus } from "_r/App/RpcIssueDialog/useConnectionStatus";
import { ipcService } from "_r/ipc/ipcService";
import { RpcConfigurations } from "_t/IpcMessages";
import { rpcSettingsSubmitHandler } from "./rpcSettingsSubmitHandler";
import { rpcSettingsValidationSchema } from "./rpcSettingsValidationSchema";

export const useRpcSettingsHooks = (onSuccessfulFormSubmit: () => void) => {
  const [initialValues, setInitialValues] = useState<FormValues>({
    useDefaultSettings: true,
    useCookieAuthentication: true,
    cookiePath: "",
    username: "",
    password: "",
    serverUrl: DEFAULT_SERVER_URL,
  });

  useEffect(() => {
    const request = async () => {
      const response = await ipcService.getSavedRpcConfigurations(__NONCE__);

      setInitialValues({
        useDefaultSettings: !response,
        username: response && "username" in response ? response.username : "",
        password: response && "password" in response ? response.password : "",
        cookiePath:
          response && "cookiePath" in response ? response.cookiePath : "",
        serverUrl:
          response && "serverUrl" in response
            ? response.serverUrl
            : DEFAULT_SERVER_URL,
        useCookieAuthentication: !response || "cookiePath" in response,
      });
    };

    request();
  }, []);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: rpcSettingsValidationSchema,
    onSubmit: rpcSettingsSubmitHandler(onSuccessfulFormSubmit),
  });

  const rpcConfigurations: RpcConfigurations = {
    serverUrl: formik.values.serverUrl,
    ...(formik.values.useCookieAuthentication
      ? { cookiePath: formik.values.cookiePath }
      : {
          username: formik.values.username,
          password: formik.values.password,
        }),
  };

  const connectionStatus = useConnectionStatus(
    formik.values.useDefaultSettings ? null : rpcConfigurations,
  );

  return {
    formik,
    connectionStatus,
    setCookiePathFromDialog: async () => {
      const response = await ipcService.getCookiePathFromOpenDialog(__NONCE__);

      /* istanbul ignore else: hard to test since it has no visual representation */
      if (response !== null) {
        formik.setFieldValue("cookiePath", response);
      }
    },
  };
};

export type FormValues = {
  useDefaultSettings: boolean;
  useCookieAuthentication: boolean;
  password: string;
  username: string;
  cookiePath: string;
  serverUrl: string;
};

export type HookData = ReturnType<typeof useRpcSettingsHooks>;
