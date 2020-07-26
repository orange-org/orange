import React from "react";
import { DialogContent, DialogActions, Button } from "@material-ui/core";
import { RpcSettingsForm } from "src/App/components/RpcSettings/RpcSettingsForm";
import { useRpcSettingsHooks } from "src/App/components/RpcSettings/useRpcSettings";
import { RpcSettingsSaveButton } from "src/App/components/RpcSettings/RpcSettingsSaveButton";
import { testIds } from "_r/testIds";

export const RpcSettingsInDialog: React.FC<{
  navigateBackToConnectionStatusReport: () => void;
}> = props => {
  const hookData = useRpcSettingsHooks(
    props.navigateBackToConnectionStatusReport,
  );

  return (
    <>
      <DialogContent data-testid={testIds.rpcSettingsInDialog}>
        <RpcSettingsForm hookData={hookData} />
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={props.navigateBackToConnectionStatusReport}
          disableElevation
        >
          Cancel without saving
        </Button>

        <RpcSettingsSaveButton hookData={hookData} />
      </DialogActions>
    </>
  );
};
