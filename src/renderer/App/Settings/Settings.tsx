import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
// import { RpcSettings } from "_r/App/components/RpcSettings/RpcSettings";

export const Settings: React.FC = () => {
  const a = useAtomicCss();

  return (
    <div
      className={a(
        "topLevelComponent",
        "padding6",
        "maxWidth800",
        "marginLeftAuto",
        "marginRightAuto",
      )}
    >
      <Typography variant="h1">Settings</Typography>

      <Paper className={a("marginTop05", "padding3")}>
        {/* <RpcSettings /> */}
      </Paper>
    </div>
  );
};
