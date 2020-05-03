import { Paper, Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { RpcSettingsForm } from "_r/App/components/RpcSettings/RpcSettingsForm";
import { RpcSettingsSaveButton } from "_r/App/components/RpcSettings/RpcSettingsSaveButton";
import { useRpcSettingsHooks } from "_r/App/components/RpcSettings/useRpcSettings";
import { useAtomicCss } from "_r/useAtomicCss";

export const RpcSettings = () => {
  const a = useAtomicCss();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const onFormSubmitSuccess = () => setOpenSnackbar(true);
  const hookData = useRpcSettingsHooks(onFormSubmitSuccess);
  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
      <Snackbar
        autoHideDuration={6000}
        open={openSnackbar}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          elevation={3}
          variant="filled"
        >
          <Typography variant="h4">Saved!</Typography>
        </Alert>
      </Snackbar>
      <Paper className={a("marginTop02", "padding3")}>
        <RpcSettingsForm hookData={hookData} />
      </Paper>

      <div className={a("marginTop02", "displayFlex", "justifyContentFlexEnd")}>
        <RpcSettingsSaveButton hookData={hookData} />
      </div>
    </>
  );
};
