import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4),
    display: "flex",
  },

  shutdownWarningText: {
    marginLeft: theme.spacing(3),
    "& p": {
      marginTop: theme.spacing(2),
    },
  },
}));
