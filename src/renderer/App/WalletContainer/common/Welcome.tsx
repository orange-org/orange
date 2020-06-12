import { Link, LinkProps, Typography } from "@material-ui/core";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useAtomicCss } from "_r/useAtomicCss";

export const Welcome: React.FC<{
  prompt: string;
  action: string;
  to: LinkProps<typeof ReactRouterLink>["to"];
}> = props => {
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
      <Typography variant="h2">{props.prompt}</Typography>
      <Link
        variant="h1"
        className={a("marginTop05")}
        component={ReactRouterLink}
        to={props.to}
      >
        {props.action}
      </Link>
    </div>
  );
};
