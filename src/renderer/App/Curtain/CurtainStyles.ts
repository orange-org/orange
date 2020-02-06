import { fade, makeStyles } from "@material-ui/core";

export const useCurtainStyles = makeStyles(theme => ({
  curtain: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    background: `radial-gradient(circle, rgba(250,250,250,1) 65%, ${fade(
      theme.palette.secondary.main,
      0.05,
    )} 100%)`,
  },

  centeredText: {
    textAlign: "center",
  },

  progressBar: {
    marginTop: theme.spacing(10),
    width: "400px",
  },
}));
