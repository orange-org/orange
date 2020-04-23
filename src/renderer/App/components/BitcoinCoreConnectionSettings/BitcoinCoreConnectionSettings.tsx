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
import Yup from "yup";
import { useConnectionStatus } from "_r/App/BitcoinCoreConnectionIssueDialog/useConnectionStatus";
import { ipcService } from "_r/ipc/ipcService";
import { useAtomicCss } from "_r/useAtomicCss";
import { NullableProperties, KeysOfUnion } from "_t/typeHelpers";
import { RpcConfigurations } from "_t/IpcMessages";
import { BitcoinCoreConnectionStatus } from "../BitcoinCoreConnectionStatus/BitcoinCoreConnectionStatus";
import { calculateUseCookieAuthentication } from "./calculateUseCookieAuthentication";

type FormValues = {
  useCookieAuthentication: boolean;
  password: string;
  username: string;
  cookieFile: string;
  serverUrl: string;
};

export const useBitcoinCoreConnectionSettingsHooks = () => {
  const [initialValues, setInitialValues] = useState<FormValues>({
    useCookieAuthentication: true,
    cookieFile: "",
    username: "",
    password: "",
    serverUrl: "http://localhost:8332",
  });

  useEffect(() => {
    const request = async () => {
      try {
        const response = await ipcService.getRpcConfigurations(__NONCE__);

        setInitialValues({
          username: "username" in response ? response.username : "",
          password: "password" in response ? response.password : "",
          cookieFile: "cookieFile" in response ? response.cookieFile : "",
          serverUrl:
            "serverUrl" in response
              ? response.serverUrl
              : "http://localhost:8332",
          useCookieAuthentication: calculateUseCookieAuthentication(response),
        });
      } catch (e) {
        console.log(e);
      }
    };

    request();
  }, []);

  const cookieAuthenticationState = useState(true);
  const [useCookieAuthentication] = cookieAuthenticationState;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    // validationSchema: Yup.object().shape({
    //   cookieFile: Yup.string().required("Required"),
    // }),
    // @ts-ignore
    onSubmit: v => console.log(v),
  });

  const rpcConfigurations: RpcConfigurations = {
    serverUrl: formik.values.serverUrl,
    ...(formik.values.useCookieAuthentication
      ? { cookieFile: formik.values.cookieFile! }
      : {
          username: formik.values.username!,
          password: formik.values.password!,
        }),
  };

  const connectionStatus = useConnectionStatus(rpcConfigurations);

  return {
    formik,
    connectionStatus,
    cookieAuthenticationState,
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
  const commonTextFieldProps: Pick<
    OutlinedTextFieldProps,
    "size" | "fullWidth" | "variant"
  > = {
    size: "small",
    fullWidth: true,
    variant: "outlined",
  };
  const {
    cookieAuthenticationState: [
      useCookieAuthentication,
      setCookieAuthentication,
    ],
    formik,
    setCookieFileFromDialog,
    connectionStatus: { connectionIssue },
  } = props.hookData;

  return (
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
        Every time you start Bitcoin Core with server enabled, it creates a file
        usually called <code>.cookie</code> where it stores the username and
        password for connecting to the server.Apps that talk to Bitcoin Core,
        like Orange, can use this file for authentication.
      </Typography>

      {formik.values.useCookieAuthentication && (
        <>
          <div className={a("displayFlex", "alignItemsCenter", "marginTop05")}>
            <TextField
              {...commonTextFieldProps}
              label="Cookie file"
              {...formik.getFieldProps("cookieFile")}
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
          <div className={a("displayFlex", "marginTop05", "alignItemsCenter")}>
            <TextField
              {...commonTextFieldProps}
              label="Username"
              {...formik.getFieldProps("username")}
            />

            <Typography variant="h3" className={a("marginLeft02")}>
              :
            </Typography>

            <TextField
              {...commonTextFieldProps}
              label="Password"
              className={a("marginLeft02")}
              {...formik.getFieldProps("password")}
            />
          </div>

          <Typography className={a("helperText")}>
            The value of your username and password can be automatically read
            from your cookie if you&apos; ve chosen to use cookie
            authentication.You can also enter the username and password here
            manually.<code>rpcauth</code> username and password should also
            work.
          </Typography>
        </>
      )}

      <TextField
        {...commonTextFieldProps}
        className={a("marginTop05")}
        label="Server URL"
        {...formik.getFieldProps("serverUrl")}
      />

      <Typography className={a("helperText")}>
        Bitcoin Core server is usually reachable at{" "}
        <code>http://localhost:8332</code>.If you have different configurations,
        you can enter your server URL here manually.
      </Typography>

      <div className={a("marginTop05")}>
        <BitcoinCoreConnectionStatus issue={connectionIssue} />
      </div>
    </>
  );
};
