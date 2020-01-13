import { withStyles } from "@material-ui/core";

export const GlobalCss = withStyles({
  "@global": {
    "html, body": {
      height: "100%",
      width: "100%",
      overflow: "hidden",
    },

    "#app": {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },

    "*:focus": {
      outline: "none",
    },

    "h1, h2, h3, h4, h5, h6, p": {
      cursor: "default",
    },
  },
})(() => null);
