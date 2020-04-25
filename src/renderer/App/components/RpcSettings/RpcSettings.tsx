import { Paper } from "@material-ui/core";
import React from "react";
import { RpcSettingsForm } from "_r/App/components/RpcSettings/RpcSettingsForm";
import { RpcSettingsSaveButton } from "_r/App/components/RpcSettings/RpcSettingsSaveButton";
import { useRpcSettingsHooks } from "_r/App/components/RpcSettings/useRpcSettings";
import { useAtomicCss } from "_r/useAtomicCss";

export const RpcSettings: React.FC<{
  onClickCancel: () => void;
}> = () => {
  const a = useAtomicCss();
  const hookData = useRpcSettingsHooks();

  return (
    <>
      <Paper className={a("marginTop05", "padding3")}>
        <RpcSettingsForm hookData={hookData} />
      </Paper>

      <RpcSettingsSaveButton hookData={hookData} />
    </>
  );
};
