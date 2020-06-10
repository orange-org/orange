import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { Typography, Link } from "@material-ui/core";
import { Link as ReactRouterLink } from "react-router-dom";

export const Welcome: React.FC<{
  prompt: string;
  action: string;
  link: string;
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
        to={props.link}
      >
        {props.action}
      </Link>
    </div>
  );
};
