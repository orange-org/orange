import { makeStyles } from "@material-ui/core";

export const useTxDetailsStyles = makeStyles(theme => ({
  txDetails: {
    margin: `-10px -${theme.spacing(6) - theme.spacing(1)}px 0`,
    position: "relative",
  },

  shadow: {
    height: 100,
    boxShadow:
      "0px -2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    transform: "perspective(50rem) rotateX(-1deg)",
    background: "#f5f5f5",
  },

  content: {
    padding: 10,
    position: "relative",
    minHeight: 150,
    marginTop: "-100px",
    background: "#f5f5f5",
  },
}));
