import { Button as MuiButton, ButtonProps } from "@material-ui/core";
import React from "react";
import { HookData } from "./useRpcSettings";

export const RpcSettingsSaveButton: React.FC<{
  hookData: HookData;
  buttonProps?: ButtonProps;
}> = props => (
  <MuiButton
    data-testid="rpcSettingsSaveButton"
    color="primary"
    variant="contained"
    disableElevation
    {...props.buttonProps}
    onClick={() => props.hookData.formik.handleSubmit()}
  >
    Save settings
  </MuiButton>
);
