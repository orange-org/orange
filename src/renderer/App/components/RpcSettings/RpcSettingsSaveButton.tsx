import { Button as MuiButton, ButtonProps } from "@material-ui/core";
import React from "react";
import { testIds } from "_r/testIds";
import { HookData } from "./useRpcSettings";

export const RpcSettingsSaveButton: React.FC<{
  hookData: HookData;
  buttonProps?: ButtonProps;
}> = props => (
  <MuiButton
    data-testid={testIds.rpcSettingsSaveButton}
    color="primary"
    variant="contained"
    disableElevation
    {...props.buttonProps}
    onClick={() => props.hookData.formik.handleSubmit()}
  >
    Save settings
  </MuiButton>
);
