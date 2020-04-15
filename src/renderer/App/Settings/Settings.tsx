import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
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

        <TextField
          {...commonTextFieldProps}
          className={a("marginTop05")}
          label="Server URL"
        />

        <FormControlLabel
          className={a("marginTop05")}
          control={<Switch checked onChange={() => true} name="checkedB" />}
          label={<Typography>Use cookie authentication</Typography>}
        />

        <div className={a("displayFlex", "alignItemsCenter", "marginTop05")}>
          <TextField {...commonTextFieldProps} label="Cookie file" />

          <IconButton>
            <FolderOpen />
          </IconButton>
        </div>

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
      </Paper>
    </div>
  );
};
