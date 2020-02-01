import { withStyles } from "@material-ui/core";

export const GlobalCss = withStyles({
  "@global": {
    body: {
      height: "100vh",
      overflow: "hidden",
    },

    "#app": {
      height: "100%",
      overflow: "hidden",
    },

    "*:focus": {
      outline: "none",
    },

    "*": {
      boxSizing: "border-box",
    },

    "h1, h2, h3, h4, h5, h6, p": {
      cursor: "default",
    },

    "a h1, a h2, a h3, a h4, a h5, a h6, a p": {
      cursor: "pointer",
    },

    "a:any-link": {
      textDecoration: "none",
    },
  },
})(() => null);
