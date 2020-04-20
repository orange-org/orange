import React from "react";
import { useFormik } from "formik";
import {
  Typography,
  FormControlLabel,
  Switch,
  TextField,
  IconButton,
  OutlinedTextFieldProps,
} from "@material-ui/core";
import { FolderOpen } from "@material-ui/icons";
import { useAtomicCss } from "_r/useAtomicCss";
import { useSelector } from "react-redux";

export const BitcoinCoreConnectionSettings = () => {
  const a = useAtomicCss();
  const commonTextFieldProps: Pick<
    OutlinedTextFieldProps,
    "size" | "fullWidth" | "variant"
  > = {
    size: "small",
    fullWidth: true,
    variant: "outlined",
  };
  const mainProcessData = useSelector(state => state.mainProcessData);
  const formik = useFormik({
    initialValues: {
      cookieFile: mainProcessData.cookieFile || "",
      username: mainProcessData.username || "",
      password: mainProcessData.password || "",
      serverUrl: mainProcessData.serverUrl || "",
    },
    onSubmit: {},
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h2">Bitcoin Core connection</Typography>

      <FormControlLabel
        className={a("marginTop05")}
        control={<Switch checked onChange={() => true} name="checkedB" />}
        label={<Typography>Use cookie authentication</Typography>}
      />

      <Typography className={a("helperText")}>
        Every time you start Bitcoin Core with server enabled, it creates a file
        usually called <code>.cookie</code> where it stores the username and
        password for connecting to the server. Apps that talk to Bitcoin Core,
        like Orange, can use this file for authentication.
      </Typography>

      <div className={a("displayFlex", "alignItemsCenter", "marginTop05")}>
        <TextField
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
          {...commonTextFieldProps}
          label="Username"
          value={formik.values.username}
        />

        <Typography variant="h3" className={a("marginLeft02")}>
          :
        </Typography>

        <TextField
          {...commonTextFieldProps}
          label="Password"
          className={a("marginLeft02")}
          value={formik.values.password}
        />
      </div>

      <Typography className={a("helperText")}>
        The value of your username and password can be automatically read from
        your cookie if you&apos;ve chosen to use cookie authentication. You can
        also enter the username and password here manually. <code>rpcauth</code>{" "}
        username and password should also work.
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
    </form>
  );
};
