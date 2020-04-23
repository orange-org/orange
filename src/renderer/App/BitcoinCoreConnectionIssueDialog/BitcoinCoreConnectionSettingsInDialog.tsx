import React from "react";
import { DialogContent, DialogActions, Button } from "@material-ui/core";
import { useAtomicCss } from "_r/useAtomicCss";
import {
  useBitcoinCoreConnectionSettingsHooks,
  BitcoinCoreConnectionSettingsForm,
  BitcoinCoreConnectionSettingsSaveButton,
} from "../components/BitcoinCoreConnectionSettings/BitcoinCoreConnectionSettings";

export const BitcoinCoreConnectionSettingsInDialog: React.FC<{
  onClickCancel: () => void;
}> = props => {
  const hookData = useBitcoinCoreConnectionSettingsHooks();
  const a = useAtomicCss();

  return (
    <>
      <DialogContent>
        <BitcoinCoreConnectionSettingsForm hookData={hookData} />
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={props.onClickCancel}
          disableElevation
        >
          Cancel
        </Button>

        <BitcoinCoreConnectionSettingsSaveButton hookData={hookData} />
      </DialogActions>
    </>
  );
};
