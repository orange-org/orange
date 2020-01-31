import { makeStyles } from "@material-ui/core";

export const useBlockDetailsStyles = makeStyles(theme => ({
  root: {
    borderLeft: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(6),
  },

  h3: {
    fontStyle: "italic",

    "& + &": {
      marginTop: theme.spacing(2),
    },
  },
}));
