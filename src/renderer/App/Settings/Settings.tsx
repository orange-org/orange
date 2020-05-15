import { Typography } from "@material-ui/core";
import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { testIds } from "_tu/testIds";
import { RpcSettings } from "../components/RpcSettings/RpcSettings";
import { CompensateToolbarHeight } from "../components/CompensateToolbarHeight/CompensateToolbarHeight";

export const Settings: React.FC = () => {
  const a = useAtomicCss();

  return (
    <div
      data-testid={testIds.settingsPage}
      className={a(
        "topLevelComponent",
        "padding6",
        "maxWidth800",
        "marginLeftAuto",
        "marginRightAuto",
      )}
    >
      <CompensateToolbarHeight />
      <Typography variant="h1">Settings</Typography>

      <div>
        <Typography className={a("marginTop05")} variant="h2">
          Bitcoin Core connection
        </Typography>
        <RpcSettings />
      </div>
    </div>
  );
};
