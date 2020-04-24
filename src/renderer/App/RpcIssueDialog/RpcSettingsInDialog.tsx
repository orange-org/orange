import React from "react";
import { DialogContent, DialogActions, Button } from "@material-ui/core";
import { RpcSettingsForm } from "../components/RpcSettings/RpcSettingsForm";
import { useRpcSettingsHooks } from "../components/RpcSettings/useRpcSettings";
import { RpcSettingsSaveButton } from "../components/RpcSettings/RpcSettingsSaveButton";

export const RpcSettingsInDialog: React.FC<{
  onClickCancel: () => void;
}> = props => {
  const hookData = useRpcSettingsHooks();

  return (
    <>
      <DialogContent>
        <RpcSettingsForm hookData={hookData} />
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={props.onClickCancel}
          disableElevation
        >
          Cancel
        </Button>

        <RpcSettingsSaveButton hookData={hookData} />
      </DialogActions>
    </>
  );
};
