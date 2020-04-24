import {
  Button as MuiButton,
  ButtonProps,
  FormControlLabel,
  IconButton,
  OutlinedTextFieldProps,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import { FolderOpen } from "@material-ui/icons";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { productName } from "_r/../../package.json";
import { useConnectionStatus } from "_r/App/BitcoinCoreConnectionIssueDialog/useConnectionStatus";
import { ipcService } from "_r/ipc/ipcService";
import { useAtomicCss } from "_r/useAtomicCss";
import { RpcConfigurations } from "_t/IpcMessages";
import { isValidUrl } from "_r/utils/smallUtils";
import { DEFAULT_SERVER_URL } from "_c/constants";
import { BitcoinCoreConnectionStatus } from "../BitcoinCoreConnectionStatus/BitcoinCoreConnectionStatus";

type FormValues = {
  useDefaultSettings: boolean;
  useCookieAuthentication: boolean;
  password: string;
  username: string;
  cookieFile: string;
  serverUrl: string;
};

export const useBitcoinCoreConnectionSettingsHooks = () => {
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
      const response = await ipcService.getRpcConfigurations(__NONCE__);

      setInitialValues({
        useDefaultSettings: true,
        username: "username" in response ? response.username : "",
        password: "password" in response ? response.password : "",
        cookieFile: "cookieFile" in response ? response.cookieFile : "",
        serverUrl:
          "serverUrl" in response ? response.serverUrl : DEFAULT_SERVER_URL,
        useCookieAuthentication: "cookieFile" in response,
      });
    };

    request();
  }, []);

  const requireIfUseCookieAuthenticationIs = (bool: boolean) =>
    yup.string().when("useCookieAuthentication", {
      is: bool,
      then: yup.string().required("Required"),
      otherwise: yup.string().notRequired(),
    });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: yup.object().shape({
      useCookieAuthentication: yup.bool(),
      username: requireIfUseCookieAuthenticationIs(false),
      password: requireIfUseCookieAuthenticationIs(false),
      cookieFile: requireIfUseCookieAuthenticationIs(true),
      serverUrl: yup
        .string()
        .required("Required")
        .test({ test: isValidUrl, message: "A valid URL is required" }),
    }),
    // @ts-ignore
    onSubmit: v => console.log(v),
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

type HookData = ReturnType<typeof useBitcoinCoreConnectionSettingsHooks>;

export const BitcoinCoreConnectionSettingsSaveButton: React.FC<{
  hookData: HookData;
  buttonProps?: ButtonProps;
}> = props => (
  <MuiButton
    color="primary"
    variant="contained"
    disableElevation
    {...props.buttonProps}
    onClick={() => props.hookData.formik.handleSubmit()}
  >
    Save
  </MuiButton>
);

export const BitcoinCoreConnectionSettingsForm: React.FC<{
  hookData: HookData;
}> = props => {
  const a = useAtomicCss();
  const {
    formik,
    setCookieFileFromDialog,
    connectionStatus: { connectionIssue },
  } = props.hookData;
  const getTextFieldProps = (fieldName: keyof typeof formik.values) => {
    const commonTextFieldProps: Pick<
      OutlinedTextFieldProps,
      "size" | "fullWidth" | "variant"
    > = {
      size: "small",
      fullWidth: true,
      variant: "outlined",
    };

    const error = !!formik.touched[fieldName] && !!formik.errors[fieldName];

    return {
      ...commonTextFieldProps,
      ...formik.getFieldProps(fieldName),
      error,
      helperText: error ? formik.errors[fieldName] : "",
    };
  };

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={formik.values.useDefaultSettings}
            {...formik.getFieldProps("useDefaultSettings")}
          />
        }
        label={<Typography>Use default settings</Typography>}
      />

      <Typography className={a("helperText")}>
        {productName} can try to to use the default server settings. If
        you&apos;re using the default configurations for your Bitcoin Core RPC
        server this option should work for you.
      </Typography>

      {!formik.values.useDefaultSettings && (
        <>
          <FormControlLabel
            control={
              <Switch
                checked={formik.values.useCookieAuthentication}
                {...formik.getFieldProps("useCookieAuthentication")}
              />
            }
            label={<Typography>Use cookie authentication</Typography>}
          />

          <Typography className={a("helperText")}>
            Every time you start Bitcoin Core with server enabled, it creates a
            file usually called <code>.cookie</code> where it stores the
            username and password for connecting to the server. Apps that talk
            to Bitcoin Core, like Orange, can use this file for authentication.
          </Typography>

          {formik.values.useCookieAuthentication && (
            <>
              <div
                className={a("displayFlex", "alignItemsCenter", "marginTop05")}
              >
                <TextField
                  {...getTextFieldProps("cookieFile")}
                  label="Cookie file"
                />

                <IconButton onClick={setCookieFileFromDialog}>
                  <FolderOpen />
                </IconButton>
              </div>
              <Typography className={a("helperText")}>
                You can specify your cookie file location here.
              </Typography>
            </>
          )}

          {!formik.values.useCookieAuthentication && (
            <>
              <div
                className={a("displayFlex", "marginTop05", "alignItemsCenter")}
              >
                <TextField
                  label="Username"
                  {...getTextFieldProps("username")}
                />

                <Typography variant="h3" className={a("marginLeft02")}>
                  :
                </Typography>

                <TextField
                  label="Password"
                  className={a("marginLeft02")}
                  {...getTextFieldProps("password")}
                />
              </div>

              <Typography className={a("helperText")}>
                The value of your username and password can be automatically
                read from your cookie if you&apos; ve chosen to use cookie
                authentication.You can also enter the username and password here
                manually.<code>rpcauth</code> username and password should also
                work.
              </Typography>
            </>
          )}

          <TextField
            className={a("marginTop05")}
            label="Server URL"
            {...getTextFieldProps("serverUrl")}
          />

          <Typography className={a("helperText")}>
            Bitcoin Core server is usually reachable at{" "}
            <code>http://localhost:8332</code>.If you have different
            configurations, you can enter your server URL here manually.
          </Typography>
        </>
      )}

      <div className={a("marginTop05")}>
        <BitcoinCoreConnectionStatus issue={connectionIssue} />
      </div>
    </>
  );
};
