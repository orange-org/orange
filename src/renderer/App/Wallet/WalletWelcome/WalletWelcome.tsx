import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { Typography, Link } from "@material-ui/core";
import { Link as ReactRouterLink } from "react-router-dom";

export const WalletWelcome = () => {
  const a = useAtomicCss();

  return (
    <div
      className={a(
        "displayFlex",
        "marginTop16",
        "alignItemsCenter",
        "flexDirectionColumn",
      )}
    >
      <Typography variant="h2">You don&apos;t have a wallet yet</Typography>
      <Link
        variant="h1"
        className={a("marginTop05")}
        component={ReactRouterLink}
        to="/wallet/create"
      >
        Create one
      </Link>
    </div>
  );
};
