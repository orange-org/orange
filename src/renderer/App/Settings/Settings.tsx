import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";

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
    </div>
  );
};
