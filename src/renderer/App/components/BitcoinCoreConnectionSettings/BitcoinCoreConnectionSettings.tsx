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
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAtomicCss } from "_r/useAtomicCss";

type SaveButton = React.FC<ButtonProps>;
export const BitcoinCoreConnectionSettings: React.FC<{
  render: (Content: React.FC, Button: SaveButton) => JSX.Element;
}> = props => {
  const mainProcessData = useSelector(state => state.mainProcessData);
  const [useCookieAuthentication, setCookieAuth] = useState(true);

  console.log("mainProcessData", mainProcessData);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cookieFile: mainProcessData.cookieFile || "",
      username: mainProcessData.username || "",
      password: mainProcessData.password || "",
      serverUrl: mainProcessData.serverUrl || "",
    },
    // @ts-ignore
    onSubmit: v => console.log(v),
  });

  console.log("formik.values", formik.values);

  const Button: SaveButton = buttonProps => (
    <MuiButton
      color="primary"
      {...buttonProps}
      onClick={() => formik.handleSubmit()}
    >
      Save
    </MuiButton>
  );

  const Content: React.FC = () => {
    const a = useAtomicCss();
    const commonTextFieldProps: Pick<
      OutlinedTextFieldProps,
      "size" | "fullWidth" | "variant"
    > = {
      size: "small",
      fullWidth: true,
      variant: "outlined",
    };

    return (
      <>
        <Typography variant="h2">Bitcoin Core connection</Typography>

        <FormControlLabel
          className={a("marginTop05")}
          control={
            <Switch
              checked={useCookieAuthentication}
              onChange={() => setCookieAuth(!useCookieAuthentication)}
            />
          }
          label={<Typography>Use cookie authentication</Typography>}
        />

        <Typography className={a("helperText")}>
          Every time you start Bitcoin Core with server enabled, it creates a
          file usually called <code>.cookie</code> where it stores the username
          and password for connecting to the server. Apps that talk to Bitcoin
          Core, like Orange, can use this file for authentication.
        </Typography>

        <div className={a("displayFlex", "alignItemsCenter", "marginTop05")}>
          <TextField
            disabled={!useCookieAuthentication}
            {...commonTextFieldProps}
            label="Cookie file"
            value={formik.values.cookieFile}
          />

          <IconButton>
            <FolderOpen />
          </IconButton>
        </div>

        <Typography className={a("helperText")}>
          You can specify your cookie file location here.
        </Typography>

        <div className={a("displayFlex", "marginTop05", "alignItemsCenter")}>
          <TextField
            disabled={useCookieAuthentication}
            {...commonTextFieldProps}
            label="Username"
            value={formik.values.username}
          />

          <Typography variant="h3" className={a("marginLeft02")}>
            :
          </Typography>

          <TextField
            disabled={useCookieAuthentication}
            {...commonTextFieldProps}
            label="Password"
            className={a("marginLeft02")}
            value={formik.values.password}
          />
        </div>

        <Typography className={a("helperText")}>
          The value of your username and password can be automatically read from
          your cookie if you&apos;ve chosen to use cookie authentication. You
          can also enter the username and password here manually.{" "}
          <code>rpcauth</code> username and password should also work.
        </Typography>

        <TextField
          {...commonTextFieldProps}
          className={a("marginTop05")}
          label="Server URL"
          value={formik.values.serverUrl}
        />

        <Typography className={a("helperText")}>
          Bitcoin Core server is usually reachable at{" "}
          <code>http://localhost:8332</code>. If you have different
          configurations, you can enter your server URL here manually.
        </Typography>
      </>
    );
  };

  return props.render(Content, Button);
};
