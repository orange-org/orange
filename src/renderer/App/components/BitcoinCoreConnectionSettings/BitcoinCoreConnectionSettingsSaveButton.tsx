import { Button as MuiButton, ButtonProps } from "@material-ui/core";
import React from "react";
import { HookData } from "./useBitcoinCoreConnectionSettings";

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
