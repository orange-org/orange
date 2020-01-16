import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },

  paper: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(6),

    "& .heading:not(:first-child)": {
      marginTop: theme.spacing(6),
    },
  },

  navigationButtonsContainingGrid: {
    marginTop: `-${theme.spacing(10)}px`,
  },

  selectedNavigationButton: {
    backgroundImage: "linear-gradient(to bottom, #B0B0B5, #909095)",
    color: theme.palette.secondary.main,
  },

  debugLogButton: {
    width: "fit-content",
    alignSelf: "flex-end",
    marginTop: theme.spacing(2),
  },
}));
