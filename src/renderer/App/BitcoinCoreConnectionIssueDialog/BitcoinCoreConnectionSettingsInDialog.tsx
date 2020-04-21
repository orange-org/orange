import React from "react";
import { DialogContent, DialogActions } from "@material-ui/core";
import {
  useBitcoinCoreConnectionSettingsHooks,
  BitcoinCoreConnectionSettingsForm,
  BitcoinCoreConnectionSettingsSaveButton,
} from "../components/BitcoinCoreConnectionSettings/BitcoinCoreConnectionSettings";

export const BitcoinCoreConnectionSettingsInDialog = () => {
  const hookData = useBitcoinCoreConnectionSettingsHooks();

  return (
    <>
      <DialogContent>
        <BitcoinCoreConnectionSettingsForm hookData={hookData} />
      </DialogContent>

      <DialogActions>
        <BitcoinCoreConnectionSettingsSaveButton hookData={hookData} />
      </DialogActions>
    </>
  );
};
