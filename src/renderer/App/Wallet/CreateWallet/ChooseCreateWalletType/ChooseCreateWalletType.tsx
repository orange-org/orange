import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export const ChooseCreateWalletType = () => {
  const a = useAtomicCss();
  const renderButton = (label: string, path: string) => (
    <div className={a("marginTop05")}>
      <Button
        component={Link}
        to={path}
        variant="contained"
        className={a("width80", "fontSize130%")}
        disableElevation
        color="primary"
      >
        {label}
      </Button>
    </div>
  );

  return (
    <div className={a("height100%", "displayFlex", "justifyContentCenter")}>
      <div
        className={a(
          "marginTop16",
          "displayFlex",
          "flexDirectionColumn",
          "alignItemsCenter",
        )}
      >
        <Typography variant="h1">Create a wallet</Typography>

        <div className={a("marginTop02")} />

        {renderButton("With a new key", "withNewKey")}
        {renderButton("With an existing key", "create/withExistingKey")}
      </div>
    </div>
  );
};
