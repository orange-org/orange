import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { DEFAULT_SERVER_URL } from "_c/constants";
import { useConnectionStatus } from "_r/App/RpcIssueDialog/useConnectionStatus";
import { ipcService } from "_r/ipc/ipcService";
import { RpcConfigurations } from "_t/IpcMessages";
import { rpcSettingsSubmitHandler } from "./rpcSettingsSubmitHandler";
import { rpcSettingsValidationSchema } from "./rpcSettingsValidationSchema";

export const useRpcSettingsHooks = () => {
  const [initialValues, setInitialValues] = useState<FormValues>({
    useDefaultSettings: true,
    useCookieAuthentication: true,
    cookieFile: "",
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
        cookieFile:
          response && "cookieFile" in response ? response.cookieFile : "",
        serverUrl:
          response && "serverUrl" in response
            ? response.serverUrl
            : DEFAULT_SERVER_URL,
        useCookieAuthentication: !response || "cookieFile" in response,
      });
    };

    request();
  }, []);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: rpcSettingsValidationSchema,
    onSubmit: rpcSettingsSubmitHandler(() => null),
  });

  const rpcConfigurations: RpcConfigurations = {
    serverUrl: formik.values.serverUrl,
    ...(formik.values.useCookieAuthentication
      ? { cookieFile: formik.values.cookieFile }
      : {
          username: formik.values.username,
          password: formik.values.password,
        }),
  };

  const connectionStatus = useConnectionStatus(
    formik.values.useDefaultSettings ? undefined : rpcConfigurations,
  );

  return {
    formik,
    connectionStatus,
    setCookieFileFromDialog: async () => {
      const response = await ipcService.getCookieFileFromOpenDialog(__NONCE__);

      if (response !== null) {
        formik.setFieldValue("cookieFile", response);
      }
    },
  };
};

export type FormValues = {
  useDefaultSettings: boolean;
  useCookieAuthentication: boolean;
  password: string;
  username: string;
  cookieFile: string;
  serverUrl: string;
};

export type HookData = ReturnType<typeof useRpcSettingsHooks>;
