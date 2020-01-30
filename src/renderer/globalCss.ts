import { withStyles } from "@material-ui/core";

export const GlobalCss = withStyles({
  "@global": {
    "html, body": {
      // height: "100%",
      // width: "100%",
    },

    "#app": {
      // display: "flex",
      // flexDirection: "column",
      // height: "100%",
      // paddingBottom: "50px", // This is needed to make scrolling space for the position: fix status bar
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
