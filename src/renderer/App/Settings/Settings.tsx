import React from "react";
import { useAtomicCss, AtomicCssKeysArray } from "_r/useAtomicCss";
import {
  Typography,
  TextField,
  Paper,
  FormControlLabel,
  Switch,
  IconButton,
  OutlinedTextFieldProps,
} from "@material-ui/core";
import { FolderOpen } from "@material-ui/icons";

export const Settings: React.FC = () => {
  const a = useAtomicCss();
  const commonTextFieldProps: Pick<
    OutlinedTextFieldProps,
    "size" | "fullWidth" | "variant"
  > = {
    size: "small",
    fullWidth: true,
    variant: "outlined",
  };
  const helperTextClasses: AtomicCssKeysArray = [
    "colorPrimaryFade50%",
    "fontSize0.8Rem",
    "marginTop01",
  ];

  return (
    <div
      className={a(
        "topLevelComponent",
        "padding6",
        "maxWidth800",
        "marginLeftAuto",
        "marginRightAuto",
      )}
    >
      <Typography variant="h1">Settings</Typography>

      <Paper className={a("marginTop05", "padding3")}>
        <Typography variant="h2">Bitcoin Core connection</Typography>

        <FormControlLabel
          className={a("marginTop05")}
          control={<Switch checked onChange={() => true} name="checkedB" />}
          label={<Typography>Use cookie authentication</Typography>}
        />

        <Typography className={a(...helperTextClasses)}>
          Every time you start Bitcoin Core with server enabled, it creates a
          file usually called <code>.cookie</code> where it stores the username
          and password for connecting to the server. Apps that talk to Bitcoin
          Core, like Orange, can use this file for authentication.
        </Typography>

        <div className={a("displayFlex", "alignItemsCenter", "marginTop05")}>
          <TextField {...commonTextFieldProps} label="Cookie file" />

          <IconButton>
            <FolderOpen />
          </IconButton>
        </div>

        <Typography className={a(...helperTextClasses)}>
          You can specify your cookie file location here.
        </Typography>

        <div className={a("displayFlex", "marginTop05", "alignItemsCenter")}>
          <TextField {...commonTextFieldProps} label="Username" />

          <Typography variant="h3" className={a("marginLeft02")}>
            :
          </Typography>

          <TextField
            {...commonTextFieldProps}
            label="Password"
            className={a("marginLeft02")}
          />
        </div>

        <Typography className={a(...helperTextClasses)}>
          The value of your username and password can be automatically read from
          your cookie if you've chosen to use cookie authentication. You can
          also enter the username and password here manually.{" "}
          <code>rpcauth</code> username and password should also work.
        </Typography>

        <TextField
          {...commonTextFieldProps}
          className={a("marginTop05")}
          label="Server URL"
        />

        <Typography className={a(...helperTextClasses)}>
          Bitcoin Core server is usually reachable at{" "}
          <code>http://localhost:8332</code>. If you have different
          configurations, you can enter your server URL here manually.
        </Typography>
      </Paper>
    </div>
  );
};
