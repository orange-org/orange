import { makeStyles } from "@material-ui/core";

export const useBlockDetailsStyles = makeStyles(theme => ({
  blockDetails: {
    padding: theme.spacing(6),
  },

  title: {
    fontWeight: 500,
    fontStyle: "italic",
  },

  hash: {
    fontStyle: "italic",
    color: theme.palette.text.hint,
  },
}));
