import { withStyles } from "@material-ui/core";

export const GlobalCss = withStyles({
  "@global": {
    "html, body": {
      height: "100%",
      width: "100%",
    },
  },
})(() => null);
